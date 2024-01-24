import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow requests from any origin with specific HTTP methods and headers
  app.enableCors({
    origin : "*"
  });

  await app.listen(3000);
}
bootstrap();
