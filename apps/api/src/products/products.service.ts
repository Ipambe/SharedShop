import { DATABASE_CONNECTION } from '@/common/database/database-connection'
import { DatabaseType } from '@/common/database/schema'
import { products } from '@/common/database/schema/products'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DATABASE_CONNECTION) // eslint-disable-next-line no-unused-vars
    private readonly db: DatabaseType
  ) {}

  async toggleBought(id: number) {
    const product = await this.db.query.products.findFirst({
      where: eq(products.id, id)
    })

    if (!product)
      throw new HttpException(
        `No existe un producto con el id ${id}`,
        HttpStatus.NOT_FOUND
      )

    await this.db
      .update(products)
      .set({ bought: !product.bought })
      .where(eq(products.id, id))
  }
}
