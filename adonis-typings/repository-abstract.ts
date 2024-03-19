declare module '@ioc:AdonisCrud/Crud/AbstractCrudRepository' {
  import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

  export type AbstractCrudRepositoryQsRequest = {
    page?: number
    perPage?: number
    all?: boolean
    order?: 'asc' | 'desc'
    sort?: string
  }

  export interface IndexRequest {
    qs: AbstractCrudRepositoryQsRequest
    authUser?: any
  }

  export type AbstractCrudRepositoryRequestUpdatePayload<T> = {
    id: string
    body: Partial<T>
  }

  export type AbstractCrudRepositoryGetByIdRequest = {
    id: string
    status: boolean
  }

  export interface AbstractCrudRepositoryInterface<T> {
    index(request: IndexRequest): Promise<any>
    show(id: string): Promise<T>
    update({ id, body }: AbstractCrudRepositoryRequestUpdatePayload<T>): Promise<T>
    destroy(id: string)
    getById(id: string)
    bulkInsert(items: Partial<T>[])
    bulkDelete(ids: string[])
    store(propsToStore: Partial<T>): Promise<T>
  }

  const AbstractCrudRepositoryService: {
    new <T>(model: LucidModel): AbstractCrudRepositoryInterface<T>
  }

  export { AbstractCrudRepositoryService }
}
