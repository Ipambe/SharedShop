import { Module } from '@nestjs/common'
import { ShoppingListsController } from './shopping-lists.controller'
import { ShoppingListsService } from './shopping-lists.service'
import { DatabaseModule } from '@/common/database/database.module'
// import { JwtModule } from '@nestjs/jwt'
import { INVITATION_JWT_SECRET } from 'env'

@Module({
  imports: [
    DatabaseModule,
    // JwtModule.register({
    //   secret: INVITATION_JWT_SECRET
    // })
  ],
  controllers: [ShoppingListsController],
  providers: [ShoppingListsService]
})
export class ShoppingListsModule {}
