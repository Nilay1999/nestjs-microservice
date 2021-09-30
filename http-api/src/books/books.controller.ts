import {
  Controller,
  Logger,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Query,
} from "@nestjs/common";
import { CreateBookDTO } from "./book.dto";
import {
  ClientProxyFactory,
  ClientsModule,
  ClientProxy,
  Transport,
  ClientOptions,
} from "@nestjs/microservices";

@Controller("books")
export class BooksController {
  client: ClientProxy;
  logger = new Logger("Books");
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: "redis://127.0.0.1:6379",
      },
    });
  }

  @Get()
  async getBooks() {
    this.logger.log("Getting all books");
    const pattern = { cmd: "getBooks" };
    return await this.client.send(pattern, {});
  }

  @Get(":id")
  async getBook(@Param("id") id) {
    this.logger.log(id);
    const pattern = { cmd: "getBookById" };
    return await this.client.send<number>(pattern, id);
  }

  @Post()
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    this.logger.log(createBookDTO);
    const book = await this.client.send<CreateBookDTO>(
      { cmd: "addBook" },
      createBookDTO
    );
    return book;
  }

  @Delete()
  async deleteBook(@Query() query) {
    const books = await this.client.send({ cmd: "deleteBook" }, query);
    return books;
  }
}
