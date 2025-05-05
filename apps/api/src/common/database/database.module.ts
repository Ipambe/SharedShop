import { drizzle } from 'drizzle-orm/libsql'
import { Module } from '@nestjs/common'
import { DATABASE_CONNECTION } from './database-connection'
import { TURSO_AUTH_TOKEN, TURSO_DB_URL } from 'env'
import { schema } from './schema'

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () =>
        drizzle({
          connection: {
            url: TURSO_DB_URL,
            authToken: TURSO_AUTH_TOKEN
          },
          schema
        })
    }
  ],
  exports: [DATABASE_CONNECTION]
})
export class DatabaseModule {}
