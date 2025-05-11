import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { shoppingListItems } from '@/common/database/schema/shopping-list-items'
import { shoppingLists } from '@/common/database/schema/shopping-lists'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { CreateShoppingListDto } from './DTOs/CreateShoppingListDto'
import { shoppingListMembers } from '@/common/database/schema/shopping-list-members'

@Injectable()
export class ShoppingListsService {
  constructor(
    @Inject(DATABASE_CONNECTION) // eslint-disable-next-line no-unused-vars
    private readonly db: DatabaseType
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
          shoppingListId: newShoppingList.id
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

  async addItem(id: number) {
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

  async getMembers(id: number) {
    const shoppingList = await this.db.query.shoppingLists.findFirst({
      where: eq(shoppingLists.id, id),
      with: {
        shoppingListMembers: true
      }
    })

    if (!shoppingList)
      throw new HttpException(
        `No existe una lista de compras con el id ${id}`,
        HttpStatus.NOT_FOUND
      )

    return shoppingList.shoppingListMembers
  }

  async toggleStatus(id: number, itemId: number) {
    const listNproduct = await this.db.query.shoppingListItems.findFirst({
      where: (sli, { and, eq }) =>
        and(eq(sli.shoppingListId, id), eq(sli.productId, itemId))
    })

    if (!listNproduct)
      throw new HttpException(
        `No existe un item con el id ${itemId} en la lista de compras con el id ${id}`,
        HttpStatus.NOT_FOUND
      )
    await this.db
      .update(shoppingListItems)
      .set({ status: !listNproduct.status })
      .where(
        and(
          eq(shoppingListItems.shoppingListId, id),
          eq(shoppingListItems.productId, itemId)
        )
      )
  }
}
