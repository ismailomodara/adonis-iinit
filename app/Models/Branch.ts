import { DateTime } from 'luxon'
import {BaseModel, column, HasOne, HasMany} from '@ioc:Adonis/Lucid/Orm'
import { hasOne, hasMany } from "@adonisjs/lucid/build/src/Orm/Decorators";
import Employee from "App/Models/Employee";

export default class Branch extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @column()
  public managerId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Employee)
  public manager: HasOne<typeof Employee>

  @hasMany(() => Employee)
  public employee: HasMany<typeof Employee>
}
