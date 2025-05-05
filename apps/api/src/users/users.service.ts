import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './DTOs/createUserDto'
import { users } from './users'

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
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
}
