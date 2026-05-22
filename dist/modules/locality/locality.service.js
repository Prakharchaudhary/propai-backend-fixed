"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalityService = void 0;
const common_1 = require("@nestjs/common");
let LocalityService = class LocalityService {
    constructor() {
        this.mapsKey = process.env.GOOGLE_MAPS_API_KEY;
    }
    async getNearby(lat, lng) {
        const categories = [
            { type: 'subway_station', label: 'Metro Stations' },
            { type: 'shopping_mall', label: 'Malls' },
            { type: 'hospital', label: 'Hospitals' },
            { type: 'school', label: 'Schools' },
            { type: 'restaurant', label: 'Restaurants' },
            { type: 'bank', label: 'Banks' },
        ];
        const results = {};
        for (const cat of categories) {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${cat.type}&key=${this.mapsKey}`;
            const res = await fetch(url);
            const data = await res.json();
            results[cat.label] = (data.results || [])
                .slice(0, 3)
                .map((place) => ({
                name: place.name,
                vicinity: place.vicinity,
                rating: place.rating || null,
            }));
        }
        return results;
    }
    async getDistance(propertyLat, propertyLng, destination) {
        const origin = `${propertyLat},${propertyLng}`;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=driving&key=${this.mapsKey}`;
        const res = await fetch(url);
        const data = await res.json();
        const element = data.rows?.[0]?.elements?.[0];
        if (!element || element.status !== 'OK') {
            return { error: 'Could not calculate distance' };
        }
        return {
            distance: element.distance.text,
            duration: element.duration.text,
            destination: data.destination_addresses?.[0],
        };
    }
    async geocode(address) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.mapsKey}`;
        const res = await fetch(url);
        const data = await res.json();
        const result = data.results?.[0];
        if (!result)
            return null;
        return {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            formattedAddress: result.formatted_address,
        };
    }
    async askAboutLocality(question, propertyLat, propertyLng, propertyAddress) {
        console.log('GEMINI KEY:', process.env.GEMINI_API_KEY);
        const nearby = await this.getNearby(propertyLat, propertyLng);
        const nearbyText = Object.entries(nearby)
            .map(([category, places]) => {
            if (!places.length)
                return `${category}: None found nearby`;
            return `${category}:\n${places.map((p) => `  - ${p.name} (${p.vicinity})`).join('\n')}`;
        })
            .join('\n\n');
        const prompt = `You are a helpful real estate locality assistant for Indian property buyers.

Property Location: ${propertyAddress}
Coordinates: ${propertyLat}, ${propertyLng}

NEARBY PLACES DATA:
${nearbyText}

User Question: ${question}

Answer the question naturally in the same language as the question (Hindi or English).
Be specific, helpful, and concise.
Use the nearby places data to give accurate answers.
If asked about distance/time, give approximate estimates based on location.
Keep response under 100 words.`;
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
            }),
        });
        const geminiData = await geminiRes.json();
        const answer = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Sorry, could not process your question.';
        return {
            answer,
            nearby,
        };
    }
};
exports.LocalityService = LocalityService;
exports.LocalityService = LocalityService = __decorate([
    (0, common_1.Injectable)()
], LocalityService);
//# sourceMappingURL=locality.service.js.map