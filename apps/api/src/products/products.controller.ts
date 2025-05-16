import { Controller, Inject, Param, Patch } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject() // eslint-disable-next-line no-unused-vars
    private readonly productService: ProductsService
  ) {}

  @Patch(':id/bought')
  async toggleBought(@Param('id') id: number) {
    await this.productService.toggleBought(id)
  }
}
