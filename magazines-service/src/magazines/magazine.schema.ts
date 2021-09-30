import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MagazineDocument = Magazine & Document;

@Schema()
export class Magazine {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  author: string;

  @Prop()
  publication: string;
}

export const MagazineSchema = SchemaFactory.createForClass(Magazine);
