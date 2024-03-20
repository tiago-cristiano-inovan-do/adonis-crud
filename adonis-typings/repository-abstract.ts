declare module '@ioc:AdonisCrud/Crud/AbstractCrudRepository' {
  import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
  import {
    AbstractRepositorRequestUpdatePayload,
    AbstractRepositorIndexRequest,
  } from '@ioc:AdonisCrud/Types/AbstractRepositoryQsParamsIndex'

  export interface AbstractCrudRepositoryInterface<T> {
    index(request: AbstractRepositorIndexRequest<T>): Promise<any>
    show(id: string, status?: boolean): Promise<T>
    update({ id, body }: AbstractRepositorRequestUpdatePayload<T>): Promise<T>
    destroy(id: string)
    getById(id: string)
    bulkInsert(items: Partial<T>[])
    bulkDelete(ids: string[])
    store(propsToStore: Partial<T>): Promise<T>
  }

  const AbstractCrudRepository: {
    new <T>(model: LucidModel): AbstractCrudRepositoryInterface<T>
  }

  export { AbstractCrudRepository }
}
