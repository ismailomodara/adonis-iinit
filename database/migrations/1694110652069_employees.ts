import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Statuses from "App/Enums/Statuses";

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer("role_id").unsigned().references("id").inTable("roles");
      table.integer("status_id").unsigned().references("id").inTable("statuses").defaultTo(Statuses.ACTIVE)
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("email", 255).unique().notNullable();
      table.integer("branch_id").unsigned().references("id").inTable("branches")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.integer("manager_id").unsigned().references("id").inTable("employees").nullable();
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn("branch_id")
      table.dropColumn("manager_id")
      table.dropColumn("role_id")
      this.schema.dropTable(this.tableName)
    })
  }
}
