import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BooksModule } from "./books/books.module";
import { MagazinesController } from "./magazines/magazines.controller";
import { MagazinesModule } from "./magazines/magazines.module";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: "127.0.0.1",
      port: "6379",
    }),
    BooksModule,
    MagazinesModule,
  ],
  controllers: [AppController, MagazinesController],
  providers: [AppService],
})
export class AppModule {}
