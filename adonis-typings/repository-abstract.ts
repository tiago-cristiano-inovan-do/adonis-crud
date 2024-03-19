declare module '@ioc:AdonisCrud/Crud/AbstractCrudRepository' {
  import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
  import { QueryBuilder } from '@ioc:AdonisCrud/Crud/QueryBuilder'
  import { DateTime } from 'luxon'

  export type QsRequest = {
    page?: number
    perPage?: number
    all?: boolean
    order?: 'asc' | 'desc'
    sort?: string
  }

  export interface IndexRequest {
    qs: QsRequest
    authUser?: any
  }

  export type RequestUpdatePayload<T> = {
    id: string
    body: Partial<T>
  }

  export type GetByIdRequest = {
    id: string
    status: boolean
  }

  export interface AbstractCrudRepositoryInterface<T> {
    index(request: IndexRequest): Promise<any>
    show(id: string): Promise<T>
    update({ id, body }: RequestUpdatePayload<T>): Promise<T>
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
