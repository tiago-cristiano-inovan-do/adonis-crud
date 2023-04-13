import { Operators } from './QueryOperators'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

interface QueryBuild {
  model: LucidModel
  qs: any
  selectFields: String[]
}

const keysToIgnorePagination = ['page', 'perPage', 'all', 'include']

export class QueryBuilder {
  public static build({ model, qs }: QueryBuild) {
    const query = model.query()

    for (const key in qs) {
      if (keysToIgnorePagination.includes(key)) continue
      let value = qs[key]
      let [param, operator = '='] = key.split('.')
      Operators[operator]({ query, param, value })
    }

    return query
  }
}
