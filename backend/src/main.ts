import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific origin
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from this frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // If using cookies, authentication
  });

  await app.listen(5000);
}
bootstrap();
