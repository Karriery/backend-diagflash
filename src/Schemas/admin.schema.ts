import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop({
    default:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
  })
  photo: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isConnected: Boolean;

  @Prop({ default: 'Admin' })
  type: String;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
