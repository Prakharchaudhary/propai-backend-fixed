import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:4001',
    'https://s0380lsz-3000.inc1.devtunnels.ms',
    'https://propai-backend-fixed.vercel.app',
    "https://prop-ai-phi.vercel.app",
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📖 API: http://localhost:${port}/api/v1`);
}
bootstrap();
