import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { DatabaseModule } from '@/common/database/database.module'

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [DatabaseModule]
})
export class ProductsModule {}
