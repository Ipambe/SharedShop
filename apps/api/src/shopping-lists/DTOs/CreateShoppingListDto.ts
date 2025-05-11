import { IsString, IsNotEmpty } from 'class-validator'
export class CreateShoppingListDto {
  @IsString()
  @IsNotEmpty()
  name: string
}
