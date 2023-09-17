import { DateTime } from 'luxon'
import {BaseModel, hasOne, HasOne, column} from '@ioc:Adonis/Lucid/Orm';
import Employee from "App/Models/Employee";

export default class Branch extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @column({ columnName: "manager_id" })
  public managerId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Employee, {
    localKey: "managerId",
    foreignKey: "id"
  })
  public manager: HasOne<typeof Employee>
}
