import { Injectable } from "@nestjs/common";
import { CreateMeetingDto } from "./dto/create-meeting.dto";
import { UpdateMeetingDto } from "./dto/update-meeting.dto";
import { Meeting } from "src/Schemas/meeting.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private MeetingModule: Model<Meeting>
  ) {}
  create(createMeetingDto: CreateMeetingDto) {
    return this.MeetingModule.create(createMeetingDto);
  }

  findAll() {
    return this.MeetingModule.find();
  }

  getbyToday(today: any) {
    const regex = new RegExp(today.slice(0, 10), "i"); // i for case insensitive
    console.log(today);

    return this.MeetingModule.find({ start: { $regex: regex } });
  }

  findOne(id: string) {
    return this.MeetingModule.findOne({ _id: id });
  }
  update(_id: any, updateMeetingDto: UpdateMeetingDto) {
    console.log(updateMeetingDto);
    return this.MeetingModule.updateOne({ _id }, updateMeetingDto);
  }

  remove(_id: string) {
    return this.MeetingModule.deleteOne({ _id });
  }
}
