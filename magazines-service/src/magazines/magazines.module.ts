import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Magazine, MagazineSchema } from "./magazine.schema";
import { MagazinesController } from "./magazines.controller";
import { MagazinesService } from "./magazines.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Magazine.name, schema: MagazineSchema },
    ]),
  ],
  controllers: [MagazinesController],
  providers: [MagazinesService],
})
export class MagazinesModule {}
