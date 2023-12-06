import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MeetingService } from "./meeting.service";
import { CreateMeetingDto } from "./dto/create-meeting.dto";
import { UpdateMeetingDto } from "./dto/update-meeting.dto";
import { Public } from "src/auth/decorators/public";

@Controller("meeting")
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Public()
  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingService.create(createMeetingDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.meetingService.findAll().populate("document");
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.meetingService.findOne(id).populate("document");
  }

  @Public()
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(id, updateMeetingDto);
  }

  @Public()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.meetingService.remove(id);
  }
}
