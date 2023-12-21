import { Injectable } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Document } from "src/Schemas/document.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name) private documentModule: Model<Document>
  ) {}
  create(createDocumentDto: CreateDocumentDto) {
    return this.documentModule.create(createDocumentDto);
  }

  findAll() {
    return this.documentModule.find({ archived: false });
  }

  findArchived() {
    return this.documentModule.find({ archived: true });
  }

  findOne(id: string) {
    return this.documentModule.findOne({ _id: id });
  }

  findByEmail(email: string) {
    return this.documentModule.findOne({ email: email });
  }

  update(_id: any, updateDocumentDto: UpdateDocumentDto) {
    console.log(updateDocumentDto);
    return this.documentModule.updateOne({ _id }, updateDocumentDto);
  }

  remove(_id: string) {
    console.log(_id);
    return this.documentModule.deleteOne({ _id });
  }
}
