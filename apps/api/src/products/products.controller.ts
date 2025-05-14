import { Controller, Inject } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject() // eslint-disable-next-line no-unused-vars
    private readonly productService: ProductsService
  ) {}

  // @Post()
  // async create(@Body() product: CreateProductDto) {
  //   const newProduct = await this.productService.create(product)
  //   return newProduct
  // }
}
