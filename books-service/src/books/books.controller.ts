import { BooksService } from "./books.service";
import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Query,
  Body,
} from "@nestjs/common";
import { CreateBookDTO } from "./create-book.dto";
import { MessagePattern } from "@nestjs/microservices";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @MessagePattern({ cmd: "getBooks" })
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @MessagePattern({ cmd: "getBookById" })
  async getBook(id) {
    const book = await this.booksService.getBook(id);
    return book;
  }

  @MessagePattern({ cmd: "addBook" })
  async addBook(createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO);
    return book;
  }

  @MessagePattern({ cmd: "deleteBook" })
  async deleteBook(id) {
    const books = await this.booksService.deleteBook(id);
    return books;
  }
}
