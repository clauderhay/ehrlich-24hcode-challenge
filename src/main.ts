import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as sendGrid from '@sendgrid/mail';
import config from './config';

const { SENDGRID_API_KEY } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('24hr Coding Challenge')
    .setDescription('These are the necessary APIs for the project')
    .setVersion('1.0')
    .addTag('Image Retrieval Service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const sendGridApiKey = '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'

  // Set up the SendGrid API key
  sendGrid.setApiKey(sendGridApiKey);


  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();