import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OptionsCrud } from '@ioc:AdonisCrud/Crud/Controller'

const CrudActions = [{ key: 'index', value: 'index' }]

export class CrudControllerFactory<Model> {
  public options: OptionsCrud<Model>
  constructor(protected target: any, options: OptionsCrud<Model>) {
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

  public async index(ctx: HttpContextContract) {
    const { transform } = ctx
    const qs = ctx.request.qs()
    console.log(this.options)
    //@ts-ignore
    const list = await this.options.repository.index({ qs })

    if (qs.all) {
      const pagination = {
        page: 1,
        firstPage: 1,
        lastPage: 1,
        perPage: list.length,
        total: list.length,
      }
      return {
        pagination,
        data: await transform.withContext(ctx).collection(list, this.options.transformer),
      }
    }

    const { currentPage, firstPage, lastPage, perPage, total, ...data } = list
    const pagination = {
      page: currentPage,
      firstPage,
      lastPage,
      perPage,
      total,
    }

    return {
      pagination,
      data: await transform.withContext(ctx).collection(data, this.options.transformer),
    }
  }
}
