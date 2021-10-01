import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Cache } from "cache-manager";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class MagazineMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const cache = await this.cacheManager.get("manga");
    if (cache) {
      return res.json(cache);
    }
    next();
  }
}
