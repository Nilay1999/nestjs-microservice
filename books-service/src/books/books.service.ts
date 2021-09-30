import { Injectable, HttpException, Body } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookDocument, Book } from "./books.schema";
import { Model } from "mongoose";
import { CreateBookDTO } from "./create-book.dto";

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getBook(id: string) {
    return await this.bookModel.findById(id);
  }

  async getBooks() {
    return await this.bookModel.find({});
  }

  async addBook(createBookDto: CreateBookDTO) {
    const isBookExists = await this.bookModel.findOne({
      name: createBookDto.name,
    });

    if (isBookExists) {
      return "Book already exists";
    }

    const book = new this.bookModel({
      name: createBookDto.name,
      price: createBookDto.price,
      author: createBookDto.author,
    });

    return await book.save();
  }

  async deleteBook(id) {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
