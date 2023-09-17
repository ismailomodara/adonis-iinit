import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Branch from "App/Models/Branch";

export default class BranchesController {
  public async index({  }: HttpContextContract) {
    try {
      const branches = await Branch
        .query()
        .preload("manager");
      return {
        status: true,
        message: "All branches fetched successfully",
        data: branches
      }
    } catch (e) {
      return {
        status: false,
        message: e,
      }
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'code', 'manager_id'])
    try {
      const branch = new Branch()
      await branch.merge(data).save();
      return {
        status: true,
        message: "New branch added",
        data: branch
      }
    } catch (e) {
      return {
        status: false,
        message: "Error saving branch"
      }
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const branch = await Branch.findOrFail(params.id);
      return {
        status: true,
        message: "Branch details fetched",
        data: branch
      }
    } catch (e) {
      return {
        status: false,
        message: "Branch not found"
      }
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['name', 'code', 'manager_id'])

    try {
      const branch = await Branch.findOrFail(params.id);
      await branch.merge(data).save();
      return {
        status: true,
        message: "Branch details updated",
        data: branch
      }
    } catch (e) {
      return {
        status: false,
        message: "Branch not found"
      }
    }
  }

  public async destroy({}: HttpContextContract) {}
}
