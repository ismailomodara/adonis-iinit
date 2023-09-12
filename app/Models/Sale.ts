import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import {belongsTo} from "@adonisjs/lucid/build/src/Orm/Decorators";
import Employee from "App/Models/Employee";

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public employeeId: number

  @column()
  public amount: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>
}
