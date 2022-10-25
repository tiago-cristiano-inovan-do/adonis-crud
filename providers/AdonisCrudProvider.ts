import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AdonisCrudProvider {
  public static needsApplication = true
  constructor(protected app: ApplicationContract) {}

  public async register() {
    const CrudControllerDecorator = await import('../src/Decorators/Controller/CrudDecorator')
    const CrudRepositoryDecorator = await import('../src/Decorators/Repository/CrudRepository')
    console.log({ CrudRepositoryDecorator })

    this.app.container.bind('AdonisCrud/Crud/Controller', () => {
      return CrudControllerDecorator
    })

    this.app.container.bind('AdonisCrud/Crud/Repository', () => {
      return CrudRepositoryDecorator
    })
  }

  public async boot() {
    // IoC container is ready
    const Route = this.app.container.use('Adonis/Core/Route')
    Route.resource('/codegem', 'CodeGemController').apiOnly()
  }
}
