import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
// import { IUser } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.Mixed, required: false })
  avatar: any;

  @Prop({ required: false })
  fullname: string;

  @Prop({ required: false })
  gender: string;

  @Prop({ required: false })
  birthdayDate: string;

  @Prop({ required: false })
  horoscope: string;

  @Prop({ required: false })
  zodiac: string;

  @Prop({
    type: SchemaTypes.Decimal128,
    get: (data) => {
      return data ? parseFloat(data) : null;
    },
    required: false,
  })
  height: number;

  @Prop({
    type: SchemaTypes.Decimal128,
    get: (data) => {
      return data ? parseFloat(data) : null;
    },
    required: false,
  })
  weight: number;

  @Prop({ unique: true, required: true, lowercase: true, trim: true })
  username: string;

  @Prop({ unique: true, required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ array: [String], required: false })
  interests: Array<string> = [];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
