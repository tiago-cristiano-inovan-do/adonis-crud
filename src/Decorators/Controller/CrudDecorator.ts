import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

type FunctionMap = {
  [key: string]: (ctx: HttpContextContract) => Promise<any>
}

export function Crud(options: CrudOperationsOptions): ClassDecorator {
  const functionMap: FunctionMap = {
    async index(ctx) {
      const authUser = ctx.auth.user

      const { all, page = 1, perPage = 10, sort = 'created_at', order = 'desc' } = ctx.request.all()

      const qs = ctx.request.qs()

      const query = options.repository.index({ qs, authUser })
      query.orderBy(sort, order)
      if (all) {
        return query.exec()
      }

      const { rows, currentPage, total, lastPage } = await query.paginate(page, perPage)

      return ctx.transform.paginate(
        {
          rows,
          pages: {
            page: currentPage,
            perPage: perPage,
            total: total,
            lastPage: lastPage,
          },
        },
        options.transformer
      )
    },

    async show(ctx) {
      const { params, transform, request } = ctx

      const queryString = request.qs()

      let authUser = ctx.auth.user

      const data = await options.repository.show({
        id: params.id,

        authUser,

        status: queryString.status || true,
      })

      return await transform.withContext(ctx).item(data, options.transformer)
    },

    async store(ctx) {
      const body = ctx.request.only(options.storeProps)

      const hasValidator = options.validators.store

      if (hasValidator) {
        const validRequest = await ctx.request.validate(hasValidator)

        if (!validRequest) {
          return ctx.response.badRequest(this.errorsRequest)
        }
      }

      const newObject = await options.repository.store(body)
      options.event.emit(`new:${newObject.constructor.table}`, newObject)

      return ctx.response.status(201).json(newObject)
    },

    async update(ctx) {
      const { params, transform, request } = ctx

      const body = request.only(options.updateProps)

      const { id } = params

      const hasValidator = options.validators.update

      if (hasValidator) {
        const validRequest = await ctx.request.validate(hasValidator)

        if (!validRequest) {
          return ctx.response.badRequest(this.errorsRequest)
        }
      }
      const currentObject = await options.repository.getById({ id })
      if (!currentObject) {
        return ctx.response.status(404).json({ msg: 'Not Found' })
      }

      options.event.emit(`beforeUpdate:${currentObject.constructor.table}`, {
        body,
        id,
        currentObject: currentObject.toJSON(),
      })

      const updatedObject = await options.repository.update({ id, body })

      if (!updatedObject) {
        return ctx.response.status(404)
      }

      options.event.emit(`afterUpdate:${currentObject.constructor.table}`, {
        body,
        id,
        updatedObject: updatedObject.toJSON(),
      })

      const updateOutput = await transform.withContext(ctx).item(updatedObject, options.transformer)
      return ctx.response.status(200).json(updateOutput)
    },

    async destroy(ctx) {
      const { params } = ctx
      const currentObject = await options.repository.getById({ id: params.id })
      const deleted = await options.repository.destroy(params.id)

      if (deleted) {
        options.event.emit(`afterDelete:${currentObject.constructor.table}`, {
          id: params.id,
          deleted: currentObject.toJSON(),
        })
        return ctx.response.status(204)
      }

      return ctx.response.status(404)
    },
  }

  return (target) => {
    const targetPrototype = target.prototype

    const crudOptions: CrudOperationsOptions = {
      ...options,

      repository: targetPrototype.repository,
    } // Check if the controller has any of the CRUD methods already defined. // If yes, use them instead of the default methods from the decorator.

    if (targetPrototype.index) {
      functionMap.index = targetPrototype.index
    }

    if (targetPrototype.show) {
      functionMap.show = targetPrototype.show
    }

    if (targetPrototype.create) {
      functionMap.create = targetPrototype.create
    }

    if (targetPrototype.update) {
      functionMap.update = targetPrototype.update
    }

    if (targetPrototype.delete) {
      functionMap.delete = targetPrototype.delete
    } // Assign the CRUD methods to the target class prototype // Assign the CRUD methods to the target class prototype

    Object.assign(targetPrototype, {
      ...functionMap,

      repository: targetPrototype.repository,

      crudOptions,
    })

    Object.defineProperty(targetPrototype, 'repository', {
      value: options.repository,

      writable: false,

      configurable: false,
    })

    Object.defineProperty(targetPrototype, 'crudOptions', {
      value: crudOptions,

      writable: false,

      configurable: false,
    })
  }
}
