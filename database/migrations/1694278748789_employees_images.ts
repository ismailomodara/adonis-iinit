import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.json("image")
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, () => {
    })
  }
}
