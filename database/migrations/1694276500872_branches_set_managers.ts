import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'branches'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('manager_id').unsigned().references("id").inTable("employees")
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn("manager_id")
    })
  }
}
