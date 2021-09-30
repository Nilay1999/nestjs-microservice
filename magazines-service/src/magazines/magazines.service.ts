import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Magazine, MagazineDocument } from "./magazine.schema";
import { Model } from "mongoose";
import { CreateMagazineDTO } from "./create-magazine.dto";

@Injectable()
export class MagazinesService {
  constructor(
    @InjectModel(Magazine.name) private magazineModel: Model<MagazineDocument>
  ) {}

  async getMagazines() {
    return this.magazineModel.find({});
  }

  async getMagazine(id) {
    return this.magazineModel.findById(id);
  }

  async addMagazine(createMagazineDTO: CreateMagazineDTO) {
    const magazine = new this.magazineModel({
      title: createMagazineDTO.price,
      price: createMagazineDTO.price,
      author: createMagazineDTO.author,
      publication: createMagazineDTO.publication,
    });

    return magazine.save();
  }

  async deleteMagazine(id) {
    return this.magazineModel.findByIdAndDelete(id);
  }
}
