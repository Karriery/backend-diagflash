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
      "mongodb+srv://diagflashretraite:diagflashretraite@cluster0.7sebehm.mongodb.net/diagflash?retryWrites=true&w=majority"
    ),
    AuthModule,
    DocumentModule,
    MeetingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
