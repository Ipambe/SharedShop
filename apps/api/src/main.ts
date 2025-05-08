import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import { ValidationPipe } from '@nestjs/common'
import { ClerkAuthGuard } from './clerk-auth.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new ClerkAuthGuard())

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0')
  console.log(`Application is running on: ${await app.getUrl()}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
