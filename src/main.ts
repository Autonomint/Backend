import { NestFactory } from '@nestjs/core';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // add cors: true to accept requests from any endpoint
  app.useGlobalPipes(new ValidationPipe()); 
  const config = new DocumentBuilder()
  .setTitle('Autonomint')
  .setDescription('Stablecoins')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  const configService = app.get(ConfigService);

  app.use(session({
    secret: configService.get<string>('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    rolling: true, // keep session alive
    cookie: {
      maxAge: 30 * 60 * 100, // session expires in 1hr, refreshed by `rolling: true` option.
      httpOnly: true, // so that cookie can't be accessed via client-side script
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
