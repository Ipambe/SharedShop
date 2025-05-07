import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './DTOs/CreateProductDto'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject() // eslint-disable-next-line no-unused-vars
    private readonly productService: ProductsService
  ) {}

  @Post()
  async create(@Body() product: CreateProductDto) {
    const newProduct = await this.productService.create(product)
    return newProduct
  }
}
