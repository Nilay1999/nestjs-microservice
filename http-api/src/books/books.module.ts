import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { BooksController } from "./books.controller";
import * as redisStore from "cache-manager-redis-store";
import { BookMiddleware } from "./books.middleware";
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: "127.0.0.1",
      port: "6379",
    }),
  ],
  controllers: [BooksController],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BookMiddleware)
      .forRoutes({ path: "books", method: RequestMethod.GET });
  }
}
