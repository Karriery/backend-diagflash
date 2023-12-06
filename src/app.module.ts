import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { DocumentModule } from './document/document.module';
import { MeetingModule } from './meeting/meeting.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://halim:20028952Sami@cluster0.b1pz3.mongodb.net/diagflash?retryWrites=true&w=majority"
    ),
    AuthModule,
    DocumentModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
