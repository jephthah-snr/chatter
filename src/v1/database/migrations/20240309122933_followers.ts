import { Knex } from "knex";

const tableName = "followers"

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
        table.uuid("id").primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()')); //primary setup sha
        table.uuid("followerId").notNullable();
        table.uuid("userId").notNullable();

    })

}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(tableName)
}
