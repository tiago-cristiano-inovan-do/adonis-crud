import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import { OptionsCrudRepository } from '@ioc:AdonisCrud/Crud/Repository'
import { CrudRepositoryFactory } from './CrudRepositoryFactory'
export default function CrudRepository<Model extends LucidModel>(
  propsDecorator: OptionsCrudRepository<Model>
) {
  return <T extends { new (...args: any[]): {} }>(classConstructor: T) => {
    //@ts-ignore
    const crudRepository = new CrudRepositoryFactory(classConstructor, propsDecorator)
  }
}
