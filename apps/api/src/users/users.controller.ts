import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common'
import { UserService } from './users.service'
import { CreateUserDto } from './DTOs/createUserDto'

@Controller('users')
export class UserController {
  constructor(
    @Inject() // eslint-disable-next-line no-unused-vars
    private readonly userService: UserService
  ) {}

  @Get()
  async get() {
    return await this.userService.getAll()
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    const newUser = await this.userService.create(user)
    return newUser
  }

  @Get(':id/shopping-lists')
  async getShoppingLists(@Param(':id') id: string) {
    const lists = await this.userService.getShoppingLists(id)
    return lists
  }
}
