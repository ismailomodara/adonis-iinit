import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from "@ioc:Adonis/Core/Validator";
import Employee from "App/Models/Employee";

export default class AuthController {
  public async register({ request }: HttpContextContract) {
    const employeeSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'employees', column: 'email', caseInsensitive: true })]),
      password: schema.string({}, [rules.minLength(8)])
    })

    const payload = await request.validate({ schema: employeeSchema });
    return await Employee.create(payload)
  }
  public async login({ request, auth }: HttpContextContract) {
    const { email: uid, password } = request.only(["email", "password"]);

    try {
      return await auth.attempt(uid, password);
    } catch (e) {
      return "Your username or password is incorrect"
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
    return {
      message: "You are now logged out"
    }
  }
}
