import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { users } from '@/common/database/schema/users'
import { CreateUserDto } from './DTOs/CreateUserDto'
import { shoppingLists } from '@/common/database/schema/shopping-lists'
import { eq } from 'drizzle-orm'
import { shoppingListMembers } from '@/common/database/schema/shopping-list-members'

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION) // eslint-disable-next-line no-unused-vars
    private readonly db: DatabaseType
  ) {}

  async getAll() {
    return await this.db.query.users.findMany()
  }

  async create(user: CreateUserDto) {
    const [newUser] = await this.db
      .insert(users)
      .values(user)
      .returning()
      .onConflictDoNothing()

    if (!newUser)
      throw new HttpException(
        `Ya existe un usuario con el nombre ${user.username}, por favor elija uno diferente`,
        HttpStatus.CONFLICT
      )
    return newUser
  }

  async getShoppingLists(id: string) {
    const shoppingLists = await this.db.query.shoppingLists.findMany({
      with: {
        members: {
          where: eq(shoppingListMembers.userId, id),
          columns: {
            createdAt: false,
            isOwner: false,
            shoppingListId: false
          }
        }
      }
    })

    if (!shoppingLists)
      throw new HttpException(
        `No existe un usuario con el id ${id}`,
        HttpStatus.NOT_FOUND
      )

    return shoppingLists
  }

  async getShoppingList(id: number) {
    const shoppingList = await this.db.query.shoppingLists.findFirst({
      where: eq(shoppingLists.id, id),
      with: {
        products: {
          columns: {
            id: true,
            name: true,
            bought: true,
            quantity: true,
            shoppingListId: false
          }
        },
        members: {
          columns: {
            shoppingListId: false,
            userId: false,
            createdAt: true,
            isOwner: true
          },
          with: {
            user: true
          }
        }
      },
      columns: { id: false, name: false }
    })

    if (!shoppingList)
      throw new HttpException(
        `No existe una lista de compras con el id ${id}`,
        HttpStatus.NOT_FOUND
      )
    return shoppingList
  }
}
