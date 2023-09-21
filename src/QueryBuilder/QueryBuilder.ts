import { Operator, Operators } from './QueryOperators'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

interface QueryBuild {
  model: LucidModel
  qs: any
  selectFields: String[]
}

const keysToIgnorePagination = ['page', 'perPage', 'all', 'include']

export class QueryBuilder {
  public static build({ model, qs }: QueryBuild) {
    const query = model.query<any>()

    for (const key in qs) {
      if (keysToIgnorePagination.includes(key)) continue
      let value = qs[key]
      let parts = key.split('.')
      let operator = Operator.Equals
      let param = parts[0]

      const scenarios = {
        3: () => {
          const [relation, field, op] = parts
          operator = op.startsWith('$') ? (op as Operator) : Operator.Equals
          console.log({ operator })
          validateOperator(operator)
          query.whereHas(relation, (subQuery) => {
            debugger
            Operators[operator]({ query: subQuery, param: field, value })
          })
        },
        2: () => {
          const [first, second] = parts
          if (second.startsWith('$')) {
            operator = second as Operator
            validateOperator(operator)
            Operators[operator]({ query, param: first, value })
          } else {
            query.whereHas(first, (subQuery) => {
              Operators[operator]({ query: subQuery, param: second, value })
            })
          }
        },
        1: () => {
          validateOperator(operator)
          Operators[operator]({ query, param, value })
        },
      }

      const scenario = scenarios[parts.length]
      if (scenario) {
        scenario()
      }
    }

    return query
  }
}

const validateOperator = (operator: Operator) => {
  if (!(operator in Operator)) {
    // throw new Error(
    //   `Invalid operator: ${operator} - The possible operators are: ${Object.values(Operator).join(
    //     '|'
    //   )}`
    // )
  }
}
