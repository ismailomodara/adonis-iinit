import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Branch from "App/Models/Branch";

export default class BranchesController {
  public async index({  }: HttpContextContract) {
    return await Branch.all()
  }

  public async store({}: HttpContextContract) {
    return `Branch added`
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
