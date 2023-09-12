import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Branch from "App/Models/Branch";
export default class StatusesController {
  public async index({}: HttpContextContract) {
    const branches = await Branch.all();
    return {
      status: true,
      message: "Branches fetched successfully",
      data: branches
    }
  }
}
