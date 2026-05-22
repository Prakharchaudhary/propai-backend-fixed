import {
  Controller,
  Get,
  Post,
  Query,
  Body,
} from '@nestjs/common';
import { LocalityService } from './locality.service';

@Controller('locality')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  // GET /api/v1/locality/nearby?lat=28.6139&lng=77.2090
  @Get('nearby')
  getNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    return this.localityService.getNearby(
      parseFloat(lat),
      parseFloat(lng),
    );
  }

  // POST /api/v1/locality/distance
  // { propertyLat, propertyLng, destination: "Sector 18 Noida" }
  @Post('distance')
  getDistance(
    @Body()
    body: {
      propertyLat: number;
      propertyLng: number;
      destination: string;
    },
  ) {
    return this.localityService.getDistance(
      body.propertyLat,
      body.propertyLng,
      body.destination,
    );
  }

  // POST /api/v1/locality/geocode
  // { address: "Sector 62 Noida" }
  @Post('geocode')
  geocode(@Body() body: { address: string }) {
    return this.localityService.geocode(body.address);
  }

  // POST /api/v1/locality/ask
  // { question, propertyLat, propertyLng, propertyAddress }
  @Post('ask')
  ask(
    @Body()
    body: {
      question: string;
      propertyLat: number;
      propertyLng: number;
      propertyAddress: string;
    },
  ) {
    return this.localityService.askAboutLocality(
      body.question,
      body.propertyLat,
      body.propertyLng,
      body.propertyAddress,
    );
  }
}