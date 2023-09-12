import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Employee from "App/Models/Employee";

export default class EmployeesController {
  public async index({}: HttpContextContract) {
    return ""
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['role_id', 'firstname', 'lastname', 'email', 'branch_id', 'manager_id', 'password']);

    // const employee = Employee.create(data)

    // const employee = await Employee.firstOrCreate({ email: data.email }, data)

    const employee = new Employee();
    await employee.merge(data).save()

    return employee
  }

  public async show({}: HttpContextContract) {

  }


  public async update({ request }: HttpContextContract) {
    const data = request.only(['firstname', 'lastname', 'branch_id',  'manager_id', 'password'])

    return Employee.updateOrCreate(data, data)
  }

  public async destroy({}: HttpContextContract) {}
}
