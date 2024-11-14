import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupGlobalConfig } from './config/app/app.config';
import { corsConfig } from './config/cors/cors.config';
import { setupSwagger } from './config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.enableCors(corsConfig);
  
  setupGlobalConfig(app);
  
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
