import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable();
      table.string('code').notNullable();
      table.integer('service_id').unsigned().references("id").inTable("services")
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        { name: 'Auth - Profile Update', code: 'auth.updateprofile', service_id: 1 },
        { name: 'Auth - Password Update', code: 'auth.updatepassword', service_id: 1 },
        { name: 'Core - Get Employees', code: 'core.employee.index', service_id: 2 },
        { name: 'Core - Add Employee', code: 'core.employee.store', service_id: 2 },
        { name: 'Core - Get Employee', code: 'core.employee.show', service_id: 2 },
        { name: 'Core - Update Employee', code: 'core.employee.update', service_id: 2 },
        { name: 'Core - Delete Employee', code: 'core.employee.delete', service_id: 2 },
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
