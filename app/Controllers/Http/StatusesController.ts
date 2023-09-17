import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Status from "App/Models/Status";
export default class StatusesController {
  public async index({}: HttpContextContract) {
    const statuses = await Status.all();
    return {
      status: true,
      message: "Statuses fetched successfully",
      data: statuses
    }
  }
}
