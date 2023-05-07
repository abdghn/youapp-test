import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  fullname?: string;
  gender?: string;
  birthdayDate?: string;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
  avatar?: any;

  password: string;
  email: string;
  interests?: string[];
  comparePasswordAsync(password, callback): boolean;
  comparePasswordSync(password): boolean;
}
