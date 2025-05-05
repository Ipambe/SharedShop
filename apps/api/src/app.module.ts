import { Module } from '@nestjs/common'
import { CommonModule } from './common/common.module'
import { UserModule } from './users/users.module'

@Module({
  imports: [CommonModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
