import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalityService {
  private readonly mapsKey = process.env.GOOGLE_MAPS_API_KEY;

  // Nearby places fetch karo
  async getNearby(lat: number, lng: number) {
    const categories = [
      { type: 'subway_station', label: 'Metro Stations' },
      { type: 'shopping_mall', label: 'Malls' },
      { type: 'hospital', label: 'Hospitals' },
      { type: 'school', label: 'Schools' },
      { type: 'restaurant', label: 'Restaurants' },
      { type: 'bank', label: 'Banks' },
    ];

    const results: any = {};

    for (const cat of categories) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${cat.type}&key=${this.mapsKey}`;
      const res = await fetch(url);
      const data = await res.json();

      results[cat.label] = (data.results || [])
        .slice(0, 3)
        .map((place: any) => ({
          name: place.name,
          vicinity: place.vicinity,
          rating: place.rating || null,
        }));
    }

    return results;
  }

  // Distance calculate karo
  async getDistance(
    propertyLat: number,
    propertyLng: number,
    destination: string,
  ) {
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

  // Geocode karo — address se lat/lng nikalo
  async geocode(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.mapsKey}`;
    const res = await fetch(url);
    const data = await res.json();

    const result = data.results?.[0];
    if (!result) return null;

    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
    };
  }

  // AI + Maps combine — natural language answer
  async askAboutLocality(
    question: string,
    propertyLat: number,
    propertyLng: number,
    propertyAddress: string,
  ) {
      console.log('GEMINI KEY:', process.env.GEMINI_API_KEY); // add karo

    // Step 1 — Nearby places fetch karo
    const nearby = await this.getNearby(propertyLat, propertyLng);

    // Step 2 — Nearby data ko readable format mein convert karo
    const nearbyText = Object.entries(nearby)
      .map(([category, places]: [string, any]) => {
        if (!places.length) return `${category}: None found nearby`;
        return `${category}:\n${places.map((p: any) => `  - ${p.name} (${p.vicinity})`).join('\n')}`;
      })
      .join('\n\n');

    // Step 3 — Gemini se natural language answer lo
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

    const geminiRes = await fetch(
       `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`, 

      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
        }),
      },
    );

    const geminiData = await geminiRes.json();
    const answer =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, could not process your question.';

    return {
      answer,
      nearby,
    };
  }
}