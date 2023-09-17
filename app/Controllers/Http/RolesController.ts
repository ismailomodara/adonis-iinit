import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Role from "App/Models/Role";

export default class RolesController {
  public async indexD({}: HttpContextContract) {
    try {
      const roles = await Role.all()
      return {
        status: true,
        message: "All roles fetched successfully",
        data: roles
      }
    } catch (e) {
      return {
        status: false,
        message: e,
      }
    }
  }
  public async index({}: HttpContextContract) {
    try {
      const roles = await Role
        .query()
        .preload("permissions");
      return {
        status: true,
        message: "All roles fetched successfully",
        data: roles
      }
    } catch (e) {
      return {
        status: false,
        message: e,
      }
    }
  }
}
