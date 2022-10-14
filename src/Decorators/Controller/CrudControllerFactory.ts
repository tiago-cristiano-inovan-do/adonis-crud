import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CrudControllerInterface, OptionsCrud } from '@ioc:AdonisCrud/Crud/Controller'
import { CrudActions } from '../../Util/CrudActions'

export class CrudControllerFactory<Model> implements CrudControllerInterface<Model> {
  public options: OptionsCrud<Model>
  protected errorsRequest = []
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

  public async save(ctx: HttpContextContract, method, statusReturn, body: any) {
    const hasValidator = this?.options?.validators && this?.options?.validators[method]
    if (hasValidator) {
      const validRequest = await ctx.request.validate(this.options.validators[method])
      if (!validRequest) {
        return ctx.response.badRequest(this.errorsRequest)
      }
    }
    const newObject = await this.options.repository[method](body)
    return ctx.response.status(statusReturn).json(newObject)
  }

  public async store(ctx: HttpContextContract) {
    const body = ctx.request.only(this.options.storeProps)
    return this.save(ctx, 'store', 201, body)
  }

  public async update(ctx: HttpContextContract) {
    const body = ctx.request.only(this.options.updateProps)
    return this.save(ctx, 'update', 200, body)
  }
}
