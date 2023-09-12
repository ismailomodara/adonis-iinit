import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, HasOne, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import {attachment, AttachmentContract} from "@ioc:Adonis/Addons/AttachmentLite"
import {beforeSave, belongsTo, hasOne, manyToMany} from "@adonisjs/lucid/build/src/Orm/Decorators";
import Role from "App/Models/Role";
import Status from "App/Models/Status";
import Branch from "App/Models/Branch";
import Sale from "App/Models/Sale";
import Hash from "@ioc:Adonis/Core/Hash";

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public role_id: number

  @column()
  public status_id: number

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

  @column()
  public branch_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @belongsTo(() => Status)
  public status: BelongsTo<typeof Status>

  @belongsTo(() => Branch)
  public branch: BelongsTo<typeof Branch>

  @hasOne(() => Employee)
  public manager: HasOne<typeof Employee>

  @manyToMany(() => Sale)
  public sale: ManyToMany<typeof Sale>

  @beforeSave()
  public static  async hashPassword(employee: Employee) {
    if (employee.$dirty.password) {
      employee.password = await Hash.make(employee.password)
    }
  }
}
