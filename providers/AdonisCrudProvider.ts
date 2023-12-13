import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AdonisCrudProvider {
  public static needsApplication = true
  constructor(protected app: ApplicationContract) {}

  public async register() {
    const QueryBuilder = await import('../src/QueryBuilder/QueryBuilder')
    const CrudControllerDecorator = await import('../src/Decorators/Controller/CrudDecorator')
    const CrudRepository = await import('../src/Decorators/Repository/CrudRepository')
    this.app.container.bind('AdonisCrud/Crud/Controller', () => {
      return CrudControllerDecorator
    })

    this.app.container.bind('AdonisCrud/Crud/QueryBuilder', () => {
      return QueryBuilder
    })

    this.app.container.bind('AdonisCrud/Crud/Repository', () => {
      return CrudRepository
    })
  }

  public async boot() {}
}
