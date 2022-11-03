import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AuthRepositoryProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {}

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    const AuthRepository = (await import('App/Repositories/AuthRepository')).default
    return this.app.container.bind('AuthRepository', () => new AuthRepository())
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
