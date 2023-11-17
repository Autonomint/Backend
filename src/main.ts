import { NestFactory } from '@nestjs/core';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // add cors: true to accept requests from any endpoint
  app.useGlobalPipes(new ValidationPipe()); 
  const config = new DocumentBuilder()
  .setTitle('Autonomint')
  .setDescription('Stablecoins')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
