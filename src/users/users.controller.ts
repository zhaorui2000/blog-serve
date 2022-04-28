import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserModel } from './users.interface';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  public findAll(): Array<UserModel> {
    return this.usersService.findAll();
  }
  @Get(':id')
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  public findOne(@Param('id') id: string): UserModel {
    return this.usersService.findOne(id);
  }
  @Post()
  public create(@Body() user: UserModel): UserModel {
    return this.usersService.create(user);
  }
  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  public delete(@Param('id') id: string): void {
    this.usersService.delete(id);
  }
  @Put(':id')
  public update(@Param('id') id: string, @Body() post: UserModel): UserModel {
    return this.usersService.update(id, post);
  }
}
