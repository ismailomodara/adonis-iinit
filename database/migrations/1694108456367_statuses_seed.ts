import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from "@ioc:Adonis/Lucid/Database";
import Statuses from "App/Enums/Statuses";

export default class extends BaseSchema {
  protected tableName = 'statuses'

  public async up () {
    await Database.table("statuses").insert([
      { id: Statuses.ACTIVE, code: 'active', label: 'Active' },
      { id: Statuses.INACTIVE, code: 'inactive', label: 'Inactive' },
      { id: Statuses.PENDING, code: 'pending', label: 'Pending' },
      { id: Statuses.VERIFIED, code: 'verified', label: 'Verified' },
      { id: Statuses.UNVERIFIED, code: 'unverified', label: 'Unverified' },
      { id: Statuses.DISABLED, code: 'disabled', label: 'Disabled' },
      { id: Statuses.DELETED, code: 'deleted', label: 'Deleted' },
    ])
  }

  public async down () {
    //
  }
}
