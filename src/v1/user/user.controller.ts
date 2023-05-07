import {
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
  Body,
  Param,
  Res,
  UploadedFile,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptionsRegistration } from 'src/middleware/multer.middleware';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getProfile/:id')
  async getProfile(@Res() res, @Param('id') id: string) {
    try {
      const user = await this.userService.findById(id);

      res.json({
        statusCode: HttpStatus.OK,
        data: user,
      });
    } catch (e) {
      const status = e instanceof HttpException ? e.getStatus() : 500;
      res.status(status).json({
        statusCode: status,
        message: e.message,
      });
    }
  }

  @ApiConsumes('multipart/form-data')
  @Post('createProfile')
  @UseInterceptors(FileInterceptor('avatar', multerOptionsRegistration))
  async createProfile(
    @Res() res,
    @UploadedFile() avatar,
    @Body() data: CreateUserDetailDto,
  ) {
    try {
      data.avatar = avatar ? avatar.path : null;
      const updatedUser = await this.userService.saveUser(data.id, data);

      res.json({
        statusCode: HttpStatus.CREATED,
        message: 'Create Profile Success',
        data: updatedUser,
      });
    } catch (e) {
      const status = e instanceof HttpException ? e.getStatus() : 500;
      res.status(status).json({
        statusCode: status,
        message: e.message,
      });
    }
  }

  @ApiConsumes('multipart/form-data')
  @Put('updateProfile')
  @UseInterceptors(FileInterceptor('avatar', multerOptionsRegistration))
  async updateProfile(
    @Res() res,
    @UploadedFile() avatar,
    @Body() data: CreateUserDetailDto,
  ) {
    try {
      data.avatar = avatar ? avatar.path : null;
      const updatedUser = await this.userService.saveUser(data.id, data);

      res.json({
        statusCode: HttpStatus.CREATED,
        message: 'Update Profile Success',
        data: updatedUser,
      });
    } catch (e) {
      const status = e instanceof HttpException ? e.getStatus() : 500;
      res.status(status).json({
        statusCode: status,
        message: e.message,
      });
    }
  }
}
