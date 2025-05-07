import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { Inject, Injectable } from '@nestjs/common'
import { CreateProductDto } from './DTOs/CreateProductDto'
import { products } from '@/common/database/schema/products'

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DATABASE_CONNECTION) // eslint-disable-next-line no-unused-vars
    private readonly db: DatabaseType
  ) {}

  async create(product: CreateProductDto) {
    const [newProduct] = await this.db
      .insert(products)
      .values(product)
      .returning()
      .onConflictDoNothing()

    return newProduct
  }
}
