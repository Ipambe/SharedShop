import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req
} from '@nestjs/common'
import { ShoppingListsService } from './shopping-lists.service'
import { CreateShoppingListDto } from './DTOs/CreateShoppingListDto'
import { Request } from 'express'
import { CreateProductDto } from '@/products/DTOs/CreateProductDto'

@Controller('shopping-lists')
export class ShoppingListsController {
  constructor(
    @Inject() // eslint-disable-next-line no-unused-vars
    private readonly shoppingListsService: ShoppingListsService
  ) {}

  @Get(':id')
  async getShoppingListById(@Param('id') id: number) {
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
  async deleteShoppingList(@Param('id') id: number) {
    await this.shoppingListsService.delete(id)
  }

  @Post(':id/products')
  async addProductToShoppingList(
    @Param('id') id: number,
    @Body() product: CreateProductDto
  ) {
    const newProduct = await this.shoppingListsService.createProduct(
      id,
      product
    )
    return newProduct
  }

  @Get(':id/members')
  async getMembers(@Param('id') id: number) {
    const members = await this.shoppingListsService.getMembers(id)
    return members
  }

  // @Get(':id/invitations')
  // async generateInvitationURL(@Param('id') id: number) {
  //   const url = await this.shoppingListsService.generateInvitationURL(id)
  //   return { url }
  // }

  // @Post(':id/invitations')
  // async acceptInvitation(
  //   @Param('id') id: number,
  //   @Body('token') token: string,
  //   @Req() req: Request
  // ) {
  //   const shoppingList = await this.shoppingListsService.acceptInvitation(
  //     id,
  //     token,
  //     req.user!.sub
  //   )
  //   return shoppingList
  // }
}
