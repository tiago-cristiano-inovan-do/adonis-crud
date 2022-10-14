import { OptionsCrud } from '@ioc:AdonisCrud/Crud/Controller'
import { CrudControllerFactory } from './CrudControllerFactory'

export default function Crud<Model>(propsDecorator: OptionsCrud<Model>) {
  return <T extends { new (...args: any[]): {} }>(classConstructor: T) => {
    //@ts-ignore
    const crudController = new CrudControllerFactory<Model>(classConstructor, propsDecorator)
  }
}
