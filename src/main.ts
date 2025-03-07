import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationError } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const PORT = process.env.PORT ?? 5001;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix("api")

    await app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
}
start();
