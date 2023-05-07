import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(body: RegisterDto) {
    const user = new this.userModel(body);
    const saltOrRounds = 10;
    const password = 'random_password';
    const hash = await bcrypt.hash(password, saltOrRounds);
    user.password = hash;
    return await user.save();
  }

  async findByUsernameEmail(username: string) {
    let user;
    if (username.includes('@')) {
      user = await this.userModel
        .findOne({
          email: username,
        })
        .select('+password');
    } else {
      user = await this.userModel
        .findOne({
          username: username,
        })
        .select('+password');
    }

    if (!user) {
      throw new NotFoundException(`User ${username} not available`);
    }

    return user;
  }

  async findById(id: string): Promise<any> {
    console.log(id);
    return await this.userModel.findById(id);
  }

  async saveUser(id: string, body: CreateUserDetailDto) {
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '') {
        delete body[key];
      }
    });

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not available`);
    }

    const userData = Object.assign(user, body);

    await userData.save();

    return userData;
  }

  // async updateUser() {}

  // async findUserById() {}
}
