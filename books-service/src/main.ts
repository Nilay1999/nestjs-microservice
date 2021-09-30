import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

const microserviceOptions = {
  name: "BOOK_SERVICE",
  transport: Transport.REDIS,
  options: {
    url: "redis://127.0.0.1:6379",
  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions
  );
  app.listen();
}
bootstrap();
