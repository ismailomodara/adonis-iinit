import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Employee from "App/Models/Employee";

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const employeeSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'employees', column: 'email', caseInsensitive: true })]),
      password: schema.string({}, [rules.minLength(8)])
    })

    const payload = await request.validate({ schema: employeeSchema });
    const employee = await Employee.create(payload)

    return employee
  }
  public async login({ request, response, auth }: HttpContextContract) {
    const { email: uid, password } = request.only(["email", "password"]);

    try {
      const data = await auth.attempt(uid, password)
      return data;
    } catch (e) {
      return "Your username or password is incorrect"
    }
  }
}
