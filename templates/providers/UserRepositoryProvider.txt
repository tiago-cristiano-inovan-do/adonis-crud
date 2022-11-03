import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class UserRepositoryProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {}

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    const UserRepository = (await import('App/Repositories/UserRepository')).default
    return this.app.container.bind('UserRepository', () => new UserRepository())
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
