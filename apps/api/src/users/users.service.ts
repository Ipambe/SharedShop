import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { users } from '@/common/database/schema/users'
import { CreateUserDto } from './DTOs/CreateUserDto'
import { shoppingLists } from '@/common/database/schema/shopping-lists'
import { shoppingListMembers } from '@/common/database/schema/shopping-list-members'
import { eq } from 'drizzle-orm'

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
    try {
      const lists = await this.db
        .select({ id: shoppingLists.id, name: shoppingLists.name })
        .from(shoppingLists)
        .where(eq(shoppingListMembers.userId, id))
        .innerJoin(
          shoppingListMembers,
          eq(shoppingLists.id, shoppingListMembers.shoppingListId)
        )
        .innerJoin(users, eq(shoppingListMembers.userId, users.id))
      return lists
    } catch (error) {
      console.error(error)
      throw new HttpException(
        `Error al obtener las listas de compras del usuario con id ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
