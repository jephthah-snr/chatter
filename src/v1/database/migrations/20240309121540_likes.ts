import { Knex } from "knex";

const tableName = 'likes'

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
        table.uuid('id').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('postId');
        table.string('userId');
        table.timestamps(true, true);
    })
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(tableName)
}

