import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { users } from '@/common/database/schema/users'
import { CreateUserDto } from './DTOs/CreateUserDto'

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
    const user = await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      with: {
        shoppingLists: true
      }
    })

    if (!user)
      throw new HttpException(
        `No existe un usuario con el id ${id}`,
        HttpStatus.NOT_FOUND
      )

    return user.shoppingLists
  }
}
