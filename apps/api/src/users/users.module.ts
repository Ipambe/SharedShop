import { Module } from '@nestjs/common'
import { UserController } from './users.controller'
import { UserService } from './users.service'
import { DatabaseModule } from '@/common/database/database.module'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule]
})
export class UserModule {}
