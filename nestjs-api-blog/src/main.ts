import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
  .setTitle('Nestjs example API')
  .setVersion('1.0.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Boken' },'access-token')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.SERVER_PORT);
  Logger.log(`Server running on http://localhost:${process.env.SERVER_PORT}`, 'Bootstrap');
}

bootstrap();