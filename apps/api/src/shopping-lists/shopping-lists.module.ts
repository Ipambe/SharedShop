import { Module } from '@nestjs/common'
import { ShoppingListsController } from './shopping-lists.controller'
import { ShoppingListsService } from './shopping-lists.service'
import { DatabaseModule } from '@/common/database/database.module'

@Module({
  controllers: [ShoppingListsController],
  providers: [ShoppingListsService],
  imports: [DatabaseModule]
})
export class ShoppingListsModule {}
