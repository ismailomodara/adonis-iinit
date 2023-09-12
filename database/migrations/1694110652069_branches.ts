import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Branches from "App/Enums/Branches";

export default class extends BaseSchema {
  protected tableName = 'branches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('code').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { id: Branches.CORPORATE, name: 'Corporate', code: 'corporate' },
        { id: Branches.SCRANTON, name: 'Scranton', code: 'scranton' },
        { id: Branches.STANFORD, name: 'Stanford', code: 'stanford' },
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
