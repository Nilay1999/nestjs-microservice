import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class BookMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const cache = await this.cacheManager.get("bookById");
    if (cache) {
      return res.json(cache);
    }
    next();
  }
}
