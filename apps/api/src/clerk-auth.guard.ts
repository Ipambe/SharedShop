import { verifyToken } from '@clerk/backend'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger
} from '@nestjs/common'
import { CLERK_SECRET_KEY } from 'env'
import { Request } from 'express'

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger()

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    const token = authHeader?.split(' ')[1]
    if (!token) {
      this.logger.error('No token provided')
      return false
    }

    try {
      await verifyToken(token, {
        secretKey: CLERK_SECRET_KEY
      })
    } catch (err) {
      this.logger.error(err)
      return false
    }

    return true
  }
}
