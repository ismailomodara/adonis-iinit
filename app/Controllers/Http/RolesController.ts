import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
export default class RolesController {
  public async index({}: HttpContextContract) {
    return "All Roles"
  }
}
