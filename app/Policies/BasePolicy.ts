import { BasePolicy as BounceBasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Employee from 'App/Models/Employee'
import Roles from "App/Enums/Roles";
import Logger from "@ioc:Adonis/Core/Logger";

export default class BasePolicy extends BounceBasePolicy {
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
}
