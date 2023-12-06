import { Module } from "@nestjs/common";
import { MeetingService } from "./meeting.service";
import { MeetingController } from "./meeting.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Meeting, MeetingSchema } from "src/Schemas/meeting.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
  ],
  exports: [MeetingService],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
