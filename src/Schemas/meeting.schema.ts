import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Document } from './document.schema';

export type MeetingDocument = HydratedDocument<Meeting>;
@Schema({ timestamps: true })
export class Meeting {
  @Prop()
  start: string;

  @Prop()
  end: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Document.name })
  document: Document;

  @Prop({ default: 'Meeting' })
  type: String;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
