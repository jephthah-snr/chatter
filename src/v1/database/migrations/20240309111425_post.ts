import { Knex } from "knex";

const tableName = "posts"

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
        table.uuid("id").primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()')); //primary setup sha
        table.string("title").notNullable();
        table.text("content").notNullable();
        table.string("imageUrl")
        table.string("likes");
        table.string("authorId");
        table.string("comments");
        table.string("bookmarks");
        table.timestamps(true, true);

    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(tableName);
}

