import {DateTime} from 'luxon'
import {BaseModel, beforeSave, belongsTo, BelongsTo, column, computed} from '@ioc:Adonis/Lucid/Orm'
import {attachment, AttachmentContract} from "@ioc:Adonis/Addons/AttachmentLite"
import Branch from "App/Models/Branch";
import Status from "App/Models/Status";
import Role from "App/Models/Role";
import Hash from "@ioc:Adonis/Core/Hash";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'role_id' })
  public roleId: number

  @column({ columnName: 'status_id' })
  public statusId: number

  @column({ columnName: 'first_name' })
  public firstname: string

  @column({ columnName: 'last_name' })
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @attachment()
  public image: AttachmentContract | null

  @column()
  public manager_id: number | null

  @column({ columnName: 'branch_id' })
  public branchId: number

  @computed()
  public get permissions() {
    return {}
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => Status)
  public status: BelongsTo<typeof Status>

  @belongsTo(() => Branch)
  public branch: BelongsTo<typeof Branch>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @beforeSave()
  public static  async hashPassword(employee: Employee) {
    if (employee.$dirty.password) {
      employee.password = await Hash.make(employee.password)
    }
  }
}
