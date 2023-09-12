import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from "App/Enums/Roles";


export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
   await Database.table("roles").insert([
     { id: Roles.MANAGER, code: 'manager', label: 'Manger' },
     { id: Roles.SALES, code: 'sales', label: 'Sales' },
     { id: Roles.ACCOUNT, code: 'account', label: 'Account' },
     { id: Roles.QA, code: 'qa', label: 'QA' },
     { id: Roles.CUSTOMER_SERVICE, code: 'customer-service', label: 'Customer Service' },
   ])
  }

  public async down () {}
}
