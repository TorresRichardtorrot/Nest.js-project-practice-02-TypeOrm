/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { createProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
    getUsers() : Promise <User[]> {
        return this.usersService.getUsers();
    }
  
  @Get(':id')
  getUser(@Param('id',ParseIntPipe) id:number){
    return this.usersService.getUser(id)
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id',ParseIntPipe) id:number){
    return this.usersService.deleteUser(id)
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id:number, @Body() user:UpdateUserDto){
    return this.usersService.updateUser(id,user)
  }


  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id:number,
    @Body() profile: createProfileDto
    ){
    return this.usersService.createProfile(id,profile)
  }
  
}
