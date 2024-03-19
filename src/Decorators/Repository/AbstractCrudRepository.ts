import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import { QueryBuilder } from '../../QueryBuilder/QueryBuilder'
import { DateTime } from 'luxon'

export type QsRequest = {
  page?: number
  perPage?: number
  all?: boolean
  order?: 'asc' | 'desc'
  sort?: string
}

export interface IndexRequest {
  qs: QsRequest
  authUser?: any
}

export type RequestUpdatePayload<T> = {
  id: string
  body: Partial<T>
}

export type GetByIdRequest = {
  id: string
  status: boolean
}

export interface IRepository<T> {
  index(request: IndexRequest)
  show(id: string): Promise<T>
  update({ id, body }: RequestUpdatePayload<T>): Promise<T>
  destroy(id)
  getById(id)
  bulkInsert(items)
  bulkDelete(ids)
  store(propsToStore): Promise<T>
}

export abstract class AbstractCrudRepository<T> implements IRepository<T> {
  protected selecteFields: Array<string> = []
  constructor(private model: LucidModel) {}

  public index({ qs: { ...rest } }: IndexRequest): any {
    const query = QueryBuilder.build({
      model: this.model,
      qs: rest,
      selectFields: this.selecteFields,
    })
    return query
  }

  public async show(id: string, status = true): Promise<T> {
    return this.getById({ id, status })
  }

  public async store(propsToStore: Partial<T>): Promise<T> {
    const model = (await this.model.create(propsToStore)) as T
    return model
  }

  public async update({ id, body }: RequestUpdatePayload<T>) {
    const modelToUpdate = await this.getById({ id, status: true })
    if (!modelToUpdate) {
      return false
    }
    modelToUpdate.merge(body)
    await modelToUpdate.save()
    return modelToUpdate
  }

  public async destroy(id: string) {
    const modelToDelete = await this.getById({ id, status: true })
    if (!modelToDelete) return false
    try {
      modelToDelete.merge({ status: false, deleted_at: DateTime.now() })
      await modelToDelete.save()
      return true
    } catch (error) {
      throw error
    }
  }

  public async getById({ id, status = true }: GetByIdRequest) {
    const query: any = QueryBuilder.build({
      model: this.model,
      qs: { status, id },
      selectFields: this.selecteFields,
    })

    return query.first()
  }

  public async bulkInsert(items: Partial<T>[]) {
    return this.model.createMany(items)
  }

  public async bulkDelete(ids: string[]) {
    try {
      await this.model.query().whereIn('id', ids).delete()
      return true
    } catch (error) {
      throw error
    }
  }
}
