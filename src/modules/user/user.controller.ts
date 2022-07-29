import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Get, Body, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '@/modules/auth/auth.guard';
import { UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get('user')
  @UseGuards(JwtAuthGuard)
  private getUserList(): Promise<User[]> {
    return this.service.getUserList();
  }

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.service.updateName(body, req);
  }
}
