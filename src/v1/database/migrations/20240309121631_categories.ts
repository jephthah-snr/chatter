import { Knex } from "knex";


const tableName = 'followers'

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
        table.uuid("id").primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('userId').notNullable();
        table.string('followerId').notNullable();
        table.timestamp("followed_at")
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(tableName)
}

