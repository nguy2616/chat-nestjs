import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from 'src/common/enums/controller.enum';
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@ApiTags(ControllerEnum.USER)
@Controller(ControllerEnum.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() queryUserDto: QueryUserDto) {
    return this.userService.getList(queryUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete user by id' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
