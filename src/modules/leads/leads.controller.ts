import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // PUBLIC — form / chatbot
  // POST /api/v1/leads
  @Post()
  create(@Body() body: any) {
    return this.leadsService.create(body);
  }

  // ADMIN ROUTES (Protected)

  // GET /api/v1/leads/stats
  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStats() {
    return this.leadsService.getStats();
  }

  // GET /api/v1/leads
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filters: any) {
    return this.leadsService.findAll(filters);
  }

  // GET /api/v1/leads/:id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findById(id);
  }

  // PATCH /api/v1/leads/:id/status
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; notes?: string },
  ) {
    return this.leadsService.updateStatus(id, body.status, body.notes);
  }

  // PUT /api/v1/leads/:id
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.leadsService.update(id, body);
  }
}
