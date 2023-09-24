import {DateTime} from 'luxon'
import {BaseModel, beforeSave, belongsTo, BelongsTo, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import {attachment, AttachmentContract} from "@ioc:Adonis/Addons/AttachmentLite"
import Branch from "App/Models/Branch";
import Status from "App/Models/Status";
import Role from "App/Models/Role";
import Hash from "@ioc:Adonis/Core/Hash";
import Token from "App/Models/Token";
import Verify from "App/Mailers/Verify";

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

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: query  => query.where('type', 'VERIFICATION')
  })
  public verificationTokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: query  => query.where('type', 'PASSWORD_RESET')
  })
  public passwordResetTokens: HasMany<typeof Token>

  @beforeSave()
  public static  async hashPassword(employee: Employee) {
    if (employee.$dirty.password) {
      employee.password = await Hash.make(employee.password)
    }
  }

  public async sendVerificationMail() {
    const token = await Token.generateToken(this, "VERIFICATION");
    await new Verify(this, token).sendLater();
  }

  public static async getPermissions (role: number) {
    return Role.query()
      .where("id", role)
      .preload("permissions")
  }
}
