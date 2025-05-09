import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common'
import { UserService } from './users.service'
import { CreateUserDto } from './DTOs/CreateUserDto'
import { Request as ExpressRequest } from 'express'
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

  @Get('/shopping-lists')
  async getShoppingLists(@Request() req: ExpressRequest) {
    const lists = await this.userService.getShoppingLists(req.user!.sub)
    return lists
  }
}
