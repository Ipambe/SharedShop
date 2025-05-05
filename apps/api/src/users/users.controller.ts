import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { UserService } from './users.service'
import { CreateUserDto } from './DTOs/createUserDto'

@Controller('users')
export class UserController {
  constructor(@Inject() private readonly userService: UserService) {}

  @Get()
  async get() {
    return await this.userService.getAll()
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    const newUser = await this.userService.create(user)
    return newUser
  }
}
