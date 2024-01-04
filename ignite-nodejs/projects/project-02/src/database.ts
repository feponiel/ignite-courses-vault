import knex, { Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true, // pois o sqlite não suporta inserir valores padrões pras colunas
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const database = knex(config)
