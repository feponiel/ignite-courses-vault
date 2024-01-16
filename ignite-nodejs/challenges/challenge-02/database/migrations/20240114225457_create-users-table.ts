import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.text('name')
    table.text('email')
    table.timestamps(true, true) // created_at & updated_at
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
