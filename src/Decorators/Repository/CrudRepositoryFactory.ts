import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import {
  CrudRepositoryInterface,
  IndexRequest,
  OptionsCrudRepository,
} from '@ioc:AdonisCrud/Crud/Repository'
import { QueryBuilder } from '../../QueryBuilder/QueryBuilder'
import { CrudActions } from '../../Util/CrudActions'

export class CrudRepositoryFactory<Model extends LucidModel>
  implements CrudRepositoryInterface<Model>
{
  public options: OptionsCrudRepository<Model>
  constructor(protected target: any, options: OptionsCrudRepository<Model>) {
    this.options = options
    this.targetProto['options'] = options
    this.setMethods()
  }

  private setMethods() {
    for (const action of CrudActions) {
      this.targetProto[action.key] = this[`${action.value}`]
    }
  }

  protected get targetProto(): any {
    return this.target.prototype
  }
  public async index({
    qs: { page = 1, perPage = 10, all = false, ...rest },
    authUser,
  }: IndexRequest) {
    const query = QueryBuilder.build({
      model: this.options.model,
      qs: rest,
      selectFields: this.options.selectFields || [],
    })

    await this.applyScopedQuery({
      query,
      model: this.options.model,
      userAuth: authUser,
    })

    if (all) {
      const allItems = await query.exec()
      return allItems
    }

    const paginatedItems = await query.paginate(page, perPage)
    return paginatedItems
  }

  public async show({ id }) {
    const item = await this.getActiveRecord(id)
    return item
  }

  public async store(propsToStore): Promise<InstanceType<Model>> {
    const newModel = await this.options.model.create(propsToStore)
    return newModel
  }

  protected async getActiveRecord(id: string) {
    const status = true
    const query = this.options.model.query()
    return query.where('id', id).where('status', status).first()
  }

  protected applyScopedQuery({ query, model, userAuth }) {
    console.log({ query, model, userAuth })
  }
}
