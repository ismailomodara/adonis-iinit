import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from "@ioc:Adonis/Core/Validator";
import Employee from "App/Models/Employee";
import Token from "App/Models/Token";
import Verify from "App/Mailers/Verify";

export default class AuthController {
  public async register({ request }: HttpContextContract) {
    const employeeSchema = schema.create({
      first_name: schema.string({ trim: true }),
      last_name: schema.string({ trim: true }),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'employees', column: 'email', caseInsensitive: true })]),
      password: schema.string({}, [rules.minLength(8)]),
      status_id: schema.number()
    })

    const payload = await request.validate({ schema: employeeSchema });
    return await Employee.create(payload)
  }

  public async code({ request }: HttpContextContract) {
    const emailSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()])
    })

    const { email } = await request.validate({ schema: emailSchema });
    const employee = await Employee.findBy("email", email)
    const code = await Token.generateToken(employee, 'VERIFICATION')

    if (employee) {
      await new Verify(employee, code).send()
    }

    return {
      message: `If the email exist, a code would be sent sent to email`
    }
  }

  public async verify({ request }: HttpContextContract) {
    const verifySchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      code: schema.number()
    })

    const { email, code } = await request.validate({ schema: verifySchema })
    const valid = await Token.verify(email, code, 'VERIFICATION')

    return {
      status: valid,
      message:  valid ? 'Verified' : 'Invalid or expired token'
    }
  }

  public async reset({ }: HttpContextContract) {

  }

  public async login({ request, auth }: HttpContextContract) {
    const { email: uid, password } = request.only(["email", "password"]);

    try {
      const token =  await auth.use('api').attempt(uid, password, {
        expiresIn: '1 day'
      });
      const user = await Employee.query().where('email', uid)

      return {
        token,
        user
      }
    } catch (e) {
      return "Your username or password is incorrect"
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      message: "You are now logged out"
    }
  }
}
