declare module '@ioc:AdonisCrud/Crud/Repository' {
  import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
  export interface OptionsCrudRepository<Model extends LucidModel> {
    model: Model
    selectFields?: Array<string>
    event: any
  }

  export interface IndexResponseInterface<Model> {
    currentPage: number
    firstPage: number
    lastPage: number
    perPage: number
    total: number
    items: Model[]
  }

  export interface ShowResponseInterface<Model> {
    item: Model
  }

  export type QsRequest = {
    page: number
    perPage: number
    all: boolean
  }

  export interface IndexRequest {
    qs: QsRequest
    auth?: any
  }

  export interface CrudRepositoryInterface<Model> {
    index?({ qs }: IndexRequest)
    show?({ qs }): Promise<ShowResponseInterface<Model>>
    store?(propToUpdate: Partial<Model>): Promise<Model>
    bulkStore?(propToUpdate: Partial<Model[]>): Promise<Model[]>
    update?(id: string, propToUpdate: Partial<Model>): Promise<Model>
    bulkUpdate?(itensToUpdat: Partial<Model[]>): Promise<Model[]>
    destroy?(id: string): Promise<boolean>
  }

  export default function CrudRepository<Model extends LucidModel>(
    propsDecorator: OptionsCrudRepository<Model>
  ): <T extends new (...args: any[]) => {}>(classConstructor: T) => void
}
