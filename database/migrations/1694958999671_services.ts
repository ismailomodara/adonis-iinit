import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {DateTime} from "luxon";

export default class extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable();
      table.string('code').notNullable();
      table.string('description').notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { id: 1, name: 'Auth', code: 'auth', description: 'Auth service', created_at: DateTime.now(), updated_at: DateTime.now()},
        { id: 2, name: 'Core', code: 'core', description: 'Core service', created_at: DateTime.now(), updated_at: DateTime.now()},
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
