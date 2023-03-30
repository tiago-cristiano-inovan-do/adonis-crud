declare module '@ioc:AdonisCrud/Crud/Repository' {
  import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
  export type QsRequest = {
    page: number
    perPage: number
    all: boolean
  }
  export interface IndexRequest {
    qs: QsRequest
    authUser?: any
  }
  export default function CrudRepository<T extends LucidModel>(Model: T): ClassDecorator
}
