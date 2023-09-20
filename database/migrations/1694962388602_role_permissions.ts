import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from "App/Enums/Roles";

export default class extends BaseSchema {
  protected tableName = 'role_permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('role_id').unsigned().notNullable().references("id").inTable("roles")
      table.integer('permission_id').unsigned().notNullable().references("id").inTable("permissions")
      table.unique(['role_id', 'permission_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { role_id: Roles.MANAGER, permission_id: 1 },
        { role_id: Roles.MANAGER, permission_id: 2 },
        { role_id: Roles.MANAGER, permission_id: 3 },
        { role_id: Roles.MANAGER, permission_id: 4 },
        { role_id: Roles.MANAGER, permission_id: 5 },
        { role_id: Roles.MANAGER, permission_id: 6 },
        { role_id: Roles.MANAGER, permission_id: 7 },
        { role_id: Roles.SALES, permission_id: 1 },
        { role_id: Roles.SALES, permission_id: 2 },
        { role_id: Roles.SALES, permission_id: 3 },
        { role_id: Roles.ACCOUNT, permission_id: 1 },
        { role_id: Roles.ACCOUNT, permission_id: 2 },
        { role_id: Roles.ACCOUNT, permission_id: 3 },
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
