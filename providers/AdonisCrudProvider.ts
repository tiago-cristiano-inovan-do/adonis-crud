import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AdonisCrudProvider {
  public static needsApplication = true
  constructor(protected app: ApplicationContract) {}

  public async register() {
    const CrudControllerDecorator = await import('../src/Decorators/Controller/CrudDecorator')
    const CrudRepository = await import('../src/Decorators/Repository/CrudRepository')
    this.app.container.bind('AdonisCrud/Crud/Controller', () => {
      return CrudControllerDecorator
    })

    this.app.container.bind('AdonisCrud/Crud/Repository', () => {
      return CrudRepository
    })
  }

  public async boot() {
    const Route = this.app.container.use('Adonis/Core/Route')
    Route.resource('/codegem', 'CodeGemController').apiOnly()
    // Route.post('/auth/register', 'AuthController.store')
    // Route.post('/auth/login', 'AuthController.login')
    // Route.post('/auth/reset-password', 'AuthController.resetPassword')
    // Route.get('/auth/me', 'AuthController.me').middleware('auth')

    Route.group(() => {
      Route.resource('profiles', 'ProfileController').apiOnly()
    }).middleware('auth')

    Route.group(() => {
      Route.resource('users', 'UserController').apiOnly()
    }).middleware('auth')
  }
}
