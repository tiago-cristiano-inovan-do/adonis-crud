import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import { QueryBuilder } from '../../QueryBuilder/QueryBuilder'

type FunctionMap = {
  [key: string]: Function
}

export type QsRequest = {
  page: number
  perPage: number
  all: boolean
}

export interface IndexRequest {
  qs: QsRequest
  authUser?: any
}

export function CrudRepository<T extends LucidModel>(Model: T): ClassDecorator {
  return (target) => {
    const functionMap: FunctionMap = {
      async index({
        qs: { page = 1, perPage = 10, all = false, ...rest },
        authUser,
      }: IndexRequest) {
        const query = QueryBuilder.build({
          model: Model,
          qs: rest,
          selectFields: [],
        })

        await this.applyScopedQuery({
          query,
          model: Model,
          userAuth: authUser,
        })

        if (all) {
          return query.exec()
        }

        const paginatedItems = await query.paginate(page, perPage)
        return paginatedItems
      },
      async show({ id, status }) {
        return this.getById({ id, status })
      },
      async store(propsToStore) {
        const model = await Model.create(propsToStore)
        //options.event.emit(`new:${model}`, model)
        return model
      },
      async update({ id, body }) {
        const modelToUpdate = await this.getById({ id })
        if (!modelToUpdate) {
          return false
        }
        modelToUpdate.merge(body)
        return await modelToUpdate.save()
      },
      async destroy(id) {
        const modelToDelete = await this.getById({ id })
        if (!modelToDelete) return false
        try {
          await modelToDelete.delete()
          return true
        } catch (error) {
          return false
        }
      },
      async applyScopedQuery() {
        console.log('not applying scope')
      },
      async getById({ id, status = true }) {
        const query = Model.query()
        const model = await query.where('id', id).where('status', status).first()
        return model
      },
    }

    const targetPrototype = target.prototype

    // Check if the repository has any of the CRUD methods already defined.
    // If yes, use them instead of the default methods from the decorator.
    if (targetPrototype.index) {
      functionMap.index = targetPrototype.index
    }
    if (targetPrototype.show) {
      functionMap.show = targetPrototype.show
    }
    if (targetPrototype.store) {
      functionMap.store = targetPrototype.store
    }
    if (targetPrototype.update) {
      functionMap.update = targetPrototype.update
    }
    if (targetPrototype.destroy) {
      functionMap.destroy = targetPrototype.destroy
    }

    // Assign the CRUD methods to the target class prototype
    Object.assign(targetPrototype, functionMap)
  }
}
