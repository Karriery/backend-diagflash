import { Module } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Document, DocumentSchema } from "src/Schemas/document.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  exports: [DocumentService],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
