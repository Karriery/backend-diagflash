import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Public } from "src/auth/decorators/public";

@Controller("document")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Public()
  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentService.findOne(id);
  }

  @Public()
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDocumentDto: UpdateDocumentDto
  ) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Public()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.documentService.remove(id);
  }
}
