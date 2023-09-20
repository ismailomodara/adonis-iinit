import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from "@ioc:Adonis/Lucid/Database";
import Roles from "App/Enums/Roles";

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    await Database.table("roles").insert([
      { id: Roles.HR, code: 'hr', label: 'HR' }
    ])

    this.defer(async (db) => {
      await db.table("role_permissions").multiInsert([
        { role_id: Roles.HR, permission_id: 1 },
        { role_id: Roles.HR, permission_id: 2 },
        { role_id: Roles.HR, permission_id: 3 },
        { role_id: Roles.HR, permission_id: 4 },
        { role_id: Roles.HR, permission_id: 5 },
        { role_id: Roles.HR, permission_id: 6 },
        { role_id: Roles.HR, permission_id: 7 }
      ])
    })
  }

  public async down () {}
}
