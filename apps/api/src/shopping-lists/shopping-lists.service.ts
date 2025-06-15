import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { shoppingLists } from '@/common/database/schema/shopping-lists'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { CreateShoppingListDto } from './DTOs/CreateShoppingListDto'
import { shoppingListMembers } from '@/common/database/schema/shopping-list-members'
import { CreateProductDto } from '@/products/DTOs/CreateProductDto'
import { products } from '@/common/database/schema/products'
// import { JwtService } from '@nestjs/jwt'

@Injectable()
export class ShoppingListsService {
  constructor(
    @Inject(DATABASE_CONNECTION) // eslint-disable-next-line no-unused-vars
    private readonly db: DatabaseType,
    // private jwtService: JwtService
  ) {}

  async getById(id: number) {
    const shoppingList = await this.db.query.shoppingLists.findFirst({
      where: eq(shoppingLists.id, id)
    })

    if (!shoppingList)
      throw new HttpException(
        `No existe una lista de compras con el id ${id}`,
        HttpStatus.NOT_FOUND
      )

    return shoppingList
  }

  async create(userId: string, shoppingList: CreateShoppingListDto) {
    const newShoppingList = await this.db.transaction(async (tx) => {
      const [newShoppingList] = await tx
        .insert(shoppingLists)
        .values(shoppingList)
        .returning()
      const [shoppingListMember] = await tx
        .insert(shoppingListMembers)
        .values({
          userId,
          shoppingListId: newShoppingList.id,
          isOwner: true
        })
        .returning()

      if (!shoppingListMember) tx.rollback()
      return newShoppingList
    })
    return newShoppingList
  }

  async delete(id: number) {
    const { rowsAffected } = await this.db
      .delete(shoppingLists)
      .where(eq(shoppingLists.id, id))

    if (rowsAffected === 0)
      throw new HttpException(
        `No existe una lista de compras con el id ${id}`,
        HttpStatus.NOT_FOUND
      )
  }

  async createProduct(id: number, product: CreateProductDto) {
    const [newProduct] = await this.db
      .insert(products)
      .values({
        ...product,
        shoppingListId: id
      })
      .onConflictDoNothing()
      .returning()

    if (!newProduct)
      throw new HttpException(
        'No se pudo crear el producto',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    return newProduct
  }

  async getMembers(id: number) {
    const shoppingList = await this.db.query.shoppingLists.findFirst({
      where: eq(shoppingLists.id, id),
      with: {
        members: true
      }
    })

    if (!shoppingList)
      throw new HttpException(
        `No existe una lista de compras con el id ${id}`,
        HttpStatus.NOT_FOUND
      )

    return shoppingList.members
  }

  // async generateInvitationURL(id: number) {
  //   const shoppingList = await this.db.query.shoppingLists.findFirst({
  //     where: eq(shoppingLists.id, id)
  //   })

  //   if (!shoppingList)
  //     throw new HttpException('No existe la lista', HttpStatus.NOT_FOUND)

  //   const payload = {
  //     shoppingListId: id
  //     // isSingleUse
  //   }
  //   const token = await this.jwtService.signAsync(payload)

  //   const invitationUrl = `https://sharedshop.app/invite/${id}?token=${token}`
  //   return invitationUrl
  // }

  // async acceptInvitation(id: number, token: string, userId: string) {
  //   const shoppingList = await this.db.query.shoppingLists.findFirst({
  //     where: eq(shoppingLists.id, id)
  //   })

  //   if (!shoppingList)
  //     throw new HttpException('No existe la lista', HttpStatus.NOT_FOUND)

  //   const payload: {
  //     shoppingListId: number
  //     // isSingleUse: boolean
  //   } = await this.jwtService.verifyAsync(token)

  //   if (payload.shoppingListId !== id)
  //     throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)

  //   const [shoppingListMember] = await this.db
  //     .insert(shoppingListMembers)
  //     .values({
  //       userId,
  //       shoppingListId: id,
  //       isOwner: false
  //     })
  //     .onConflictDoNothing()
  //     .returning()

  //   if (!shoppingListMember)
  //     throw new HttpException(
  //       'No se pudo agregar el usuario a la lista',
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     )

  //   return shoppingList
  // }
}
