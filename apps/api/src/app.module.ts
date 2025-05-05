import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { UserModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';

@Module({
  imports: [CommonModule, UserModule, ProductsModule, ShoppingListsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
