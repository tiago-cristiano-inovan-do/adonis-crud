declare module '@ioc:AdonisCrud/Crud/Controller' {
  export interface CrudOperationsOptions {
    repository: any
    transformer: any
    validators: {
      store?: any
      update?: any
    }
    storeProps: string[]
    updateProps: string[]
    event: any
  }

  export default function Crud(options: CrudOperationsOptions): ClassDecorator
}
