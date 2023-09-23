import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Employee from "App/Models/Employee";

type TokenType = 'VERIFICATION' | 'PASSWORD_RESET';

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public code: number

  @column()
  public email:  string | null

  @column({ columnName: 'employee_id' })
  public employeeId:  number | null

  @column.dateTime({ columnName: 'expires_at', serializeAs: null })
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Employee)
  public employee: BelongsTo<typeof Employee>

  public static async generateToken (employee: Employee | null, type: TokenType) {
    const code = Math.floor(Math.random() * 100000)

    if (!employee) return code

    await Token.expireTokens(employee, type === 'VERIFICATION'? 'verificationTokens' : 'passwordResetTokens');

    const record = await employee.related("tokens").create({
      type,
      code,
      email: employee.email,
      expiresAt: DateTime.now().plus({ minute: 10 }),
    })

    return record.code
  }
  public static async expireTokens (employee: Employee, relationName: 'verificationTokens' | 'passwordResetTokens') {
     await employee.related(relationName).query().update({
      expiresAt: DateTime.now()
    })
  }

  public static async deleteTokens (employee: Employee) {
     await employee.related("verificationTokens").query().delete()
  }
  public static async getTokenEmployee (token: number, type: TokenType) {
     const record = await Token.query()
       .preload("employee")
       .where("token", token)
       .where("type", type)
       .where("expiresAt", ">", DateTime.now().toSQL())
       .orderBy("createdAt", "desc")
       .first()

    return record?.employee
  }
  public static async verify (email: string, code: number, type: TokenType) {
     const record = await Token.query()
       .where("expiresAt", ">", DateTime.now().toSQL())
       .where("type", type)
       .where("code", code)
       .where("email", email)
       .first()

    return !!record
  }
}
