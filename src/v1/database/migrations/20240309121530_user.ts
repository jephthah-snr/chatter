import { Knex } from "knex";

const tableName = 'users'

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
        table.uuid("id").primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('user_name').notNullable();
        table.string('email').notNullable();
        table.enum('role', ['reader', 'writer']);
        table.string('pasword');
        table.timestamps(true, true) //
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(tableName)
}

