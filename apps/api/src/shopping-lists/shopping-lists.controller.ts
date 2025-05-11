import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req
} from '@nestjs/common'
import { ShoppingListsService } from './shopping-lists.service'
import { CreateShoppingListDto } from './DTOs/CreateShoppingListDto'
import { Request } from 'express'

@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(
    @Inject() // eslint-disable-next-line no-unused-vars
    private readonly shoppingListsService: ShoppingListsService
  ) {}

  @Get(':id')
  async getShoppingListById(id: number) {
    const shoppingList = await this.shoppingListsService.getById(id)
    return shoppingList
  }

  @Post()
  async createShoppingList(
    @Body() shoppingList: CreateShoppingListDto,
    @Req() req: Request
  ) {
    return await this.shoppingListsService.create(req.user!.sub, shoppingList)
  }

  @Delete(':id')
  async deleteShoppingList(id: number) {
    await this.shoppingListsService.delete(id)
  }

  @Post(':id/items')
  async addItemToShoppingList(id: number) {
    const shoppingList = await this.shoppingListsService.addItem(id)
    return shoppingList
  }

  @Get(':id/members')
  async getMembers(id: number) {
    const members = await this.shoppingListsService.getMembers(id)
    return members
  }

  @Patch(':id/items/:itemId')
  async updateItem(@Param('id') id: number, @Param('itemId') itemId: number) {
    const shoppingList = await this.shoppingListsService.toggleStatus(
      id,
      itemId
    )
    return shoppingList
  }
}
