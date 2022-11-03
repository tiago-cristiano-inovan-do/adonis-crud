import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Crud, { OptionsCrud } from '@ioc:AdonisCrud/Crud/Controller'
import AuthRepository from '@ioc:App/Repositories/AuthRepository'
import BaseTranformer from 'App/Transformers/BaseTranformer'
import User from 'App/Models/User'
@Crud<User>({
  repository: AuthRepository,
  storeProps: [],
  updateProps: [],
  transformer: BaseTranformer,
})
export default class AuthController<User> {
  options: OptionsCrud<User>
  public async updatePassword(ctx: HttpContextContract) {
    return this.options.repository.updatePassword(ctx)
  }

  public async resetPassword(ctx: HttpContextContract) {
    return this.options.repository.resetPassword(ctx)
  }

  public async login(ctx: HttpContextContract) {
    return this.options.repository.login(ctx)
  }

  public async me(ctx) {
    return this.options.repository.me(ctx)
  }
}
