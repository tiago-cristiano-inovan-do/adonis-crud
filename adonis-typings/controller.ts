declare module '@ioc:AdonisCrud/Crud/Controller' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

  export interface Pagination {
    page: number
    firstPage: number
    lastPage: number
    perPage: number
    total: number
  }

  export interface IndexReturnInterface<Model> {
    pagination: Pagination
    data: Model[]
  }

  export interface OptionsCrud<Model> {
    storeProps: Array<string>
    updateProps: Array<string>
    repository: any
    validators?: any
    transformer?: typeof TransformerAbstract
  }

  export interface CrudControllerInterface<Model> {
    options: OptionsCrud<Model>
    index?(ctx: HttpContextContract): Promise<IndexReturnInterface<Model>>
    show?(ctx: HttpContextContract)
    store?(ctx: HttpContextContract)
    bulkCreate?(ctx: HttpContextContract): Promise<Model>
    update?(ctx: HttpContextContract)
    bulkUpdate?(ctx: HttpContextContract): Promise<Model[]>
    delete?(ctx: HttpContextContract): Promise<Model>
    bulckdelete?(ctx: HttpContextContract): Promise<Model>
  }

  export default function Crud<Model>(
    propsDecorator: OptionsCrud<Model>
  ): <T extends new (...args: any[]) => {}>(classConstructor: T) => void
}
