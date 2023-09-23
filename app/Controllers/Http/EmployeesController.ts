import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Employee from "App/Models/Employee";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class EmployeesController {
  public async index({ bouncer }: HttpContextContract) {
    try {
      await bouncer.with('EmployeePolicy').authorize('index')
      return Employee
        .query()
        .preload("role")
        .preload("status")
        .preload("branch", (branch) => {
          branch.where("id", 1)
        });
    } catch (e) {
      return {
        error: e.message
      }
    }
  }

  public async store({ request, bouncer }: HttpContextContract) {
    await bouncer.with('EmployeePolicy').authorize('create')

    const data = request.only(['role_id', 'firstname', 'lastname', 'email', 'branch_id', 'manager_id', 'password']);

    // const employee = Employee.create(data)

    // const employee = await Employee.firstOrCreate({ email: data.email }, data)

    const employee = new Employee();
    await employee.merge(data).save()

    return employee
  }

  public async show({ params, bouncer }: HttpContextContract) {
    if (await bouncer.with('EmployeePolicy').denies('view', params.id)) {
      return {
        status: false,
        error: true,
        code: "UNAUTHORIZED",
        message: "You are not authorized to get information"
      }
    }

    try {
      const employee = await Employee.findOrFail(params.id);
      return {
        status: true,
        message: "Employee details fetched",
        data: employee
      }
    } catch (e) {
      return {
        status: false,
        message: "Employee not found"
      }
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['firstname', 'lastname', 'password'])

    try {
      const employee = await Employee.findOrFail(params.id);
      await employee.merge(data).save();
      return {
        status: true,
        message: "Employee details updated",
        data: employee
      }
    } catch (e) {
      return {
        status: false,
        message: "Employee not found"
      }
    }
  }

  public async role({ request, params }: HttpContextContract) {
    const roleSchema = schema.create({
      role_id: schema.number([ rules.exists({ table: 'roles', column: 'id' })])
    })
    const data = await request.validate({ schema: roleSchema })

    try {
      const employee = await Employee.findOrFail(params.id);
      await employee.merge(data).save();
      return employee
    } catch (e) {
      return {
        status: false,
        message: "Employee not found"
      }
    }
  }

  public async destroy({}: HttpContextContract) {}
}
