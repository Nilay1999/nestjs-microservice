import {
  Module,
  CacheModule,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { MagazinesController } from "./magazines.controller";
import * as redisStore from "cache-manager-redis-store";
import { MagazineMiddleware } from "./magazines.middleware";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: "127.0.0.1",
      port: "6379",
    }),
  ],
  controllers: [MagazinesController],
})
export class MagazinesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MagazineMiddleware)
      .forRoutes({ path: "magazines", method: RequestMethod.GET });
  }
}
