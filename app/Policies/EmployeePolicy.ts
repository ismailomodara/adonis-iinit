import Bouncer from '@ioc:Adonis/Addons/Bouncer';
import BasePolicy from "App/Policies/BasePolicy";
import Employee from 'App/Models/Employee'
import Roles from "App/Enums/Roles";
import Logger from "@ioc:Adonis/Core/Logger";

export default class EmployeePolicy extends BasePolicy {

  public async before(employee: Employee, action) {
    if(employee && [Roles.MANAGER, Roles.HR].includes(employee.roleId)) {
      Logger.info(`${employee.email} was authorized to ${action}`)
      return true
    }
  }

  public async after(employee: Employee | null, action, result) {
    const type = employee ? employee.email : 'Guest'
    result.authorized ? Logger.info(`${type} was authorized to ${action}`) : Logger.info(`${type} was denied to ${action}`)
  }

	public async index(employee: Employee) {
    return Roles.HR === employee.roleId
  }
	public async create(_: Employee) {
    return Bouncer.deny("You are not authorised to perform this action.", 404)
  }
	public async view(employee: Employee, userId) {
    return employee.id === userId;
  }
	public async update(employee: Employee, user: Employee) {
    return employee.id === user.id;
  }
	public async delete(employee: Employee, user: Employee) {
    return employee.id === user.id;
  }
}
