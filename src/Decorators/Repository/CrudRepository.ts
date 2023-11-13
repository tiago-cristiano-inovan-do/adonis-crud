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
      index({ qs: { ...rest } }: IndexRequest) {
        const query = QueryBuilder.build({
          model: Model,
          qs: rest,
          selectFields: [],
        })
        return query
      },
      async show({ id, status }) {
        return this.getById({ id, status })
      },
      async store(propsToStore) {
        const model = await Model.create(propsToStore)
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
          await modelToDelete.merge({ status: false, deleted_at: new Date() })
          await modelToDelete.save()
          return modelToDelete
        } catch (error) {
          return false
        }
      },
      async getById({ id, status = true }) {
        const query = Model.query()
        const model = await query.where('id', id).where('status', status).first()
        return model
      },
    }

    const targetPrototype = target.prototype

    Object.assign(targetPrototype, {
      ...functionMap,
      model: Model,
    })

    Object.defineProperty(targetPrototype, 'Model', {
      value: Model,
      writable: false,
      configurable: false,
    })
  }
}
