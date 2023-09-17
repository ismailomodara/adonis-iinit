import { DateTime } from 'luxon'
import {BaseModel, column, HasMany, manyToMany,ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import {hasMany} from "@adonisjs/lucid/build/src/Orm/Decorators";
import Employee from "App/Models/Employee";
import Permission from "App/Models/Permission";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public label: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Employee)
  public employee: HasMany<typeof Employee>

  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions',
  })
  public permissions: ManyToMany<typeof Permission>
}
