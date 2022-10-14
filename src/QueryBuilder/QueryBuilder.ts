import { Operatos } from './QueryOperators'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

interface QueryBuild {
  model: LucidModel
  qs: any
  selectFields: String[]
}

const keysToIgnorePagination = ['page', 'perPage', 'all']

export class QueryBuilder {
  public static build({ model, qs }: QueryBuild) {
    const modelQuery: LucidModel = model
    const query = modelQuery.query()

    for (var key in qs) {
      if (keysToIgnorePagination.includes(key)) continue
      let value = qs[key]
      let [param, operator = '='] = key.split('.')
      console.log({ value, operator, param })
      Operatos[operator]({ query, param, value })
    }

    return query
  }
}
