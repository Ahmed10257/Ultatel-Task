import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


require('dotenv').config({
  path: __dirname + '/../.env',
});

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Configure the CORS policy to allow requests from the Angular application
  app.enableCors({
    origin: ['http://localhost:4200', 'https://ultatel-task-4zfyvij69-ahmed10257s-projects.vercel.app'],
    credentials: true,
  });
  //Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  //Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
