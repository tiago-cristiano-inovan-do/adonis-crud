interface OperatorQueryParam {
  query: any
  param: string
  value: string
}

const Operators = {
  '=': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, value)
  },
  '$ilike': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, 'ILIKE', `%${value}%`)
  },
  '$gte': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, '>=', value)
  },
  '$le': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, '<=', value)
  },
  '$not': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, '<>', value)
  },
  '$lt': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, '<', value)
  },
  '$gt': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, '>', value)
  },
  '$lte': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, '<=', value)
  },
  '$ne': ({ query, param, value }: OperatorQueryParam) => {
    query.whereNot(`${param}`, value)
  },
  '$like': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, 'LIKE', `%${value}%`)
  },
  '$notLike': ({ query, param, value }: OperatorQueryParam) => {
    query.whereNot(`${param}`, 'LIKE', `%${value}%`)
  },
  '$iLike': ({ query, param, value }: OperatorQueryParam) => {
    query.where(`${param}`, 'ILIKE', `%${value}%`)
  },
  '$notILike': ({ query, param, value }: OperatorQueryParam) => {
    query.whereNot(`${param}`, 'ILIKE', `%${value}%`)
  },
  '$in': ({ query, param, value }: OperatorQueryParam) => {
    query.whereIn(`${param}`, value.split(','))
  },
  '$notIn': ({ query, param, value }: OperatorQueryParam) => {
    query.whereNotIn(`${param}`, value.split(','))
  },
  '$between': ({ query, param, value }: OperatorQueryParam) => {
    const [start, end] = value.split(',')
    query.whereBetween(`${param}`, [start, end])
  },
  '$notBetween': ({ query, param, value }: OperatorQueryParam) => {
    const [start, end] = value.split(',')
    query.whereNotBetween(`${param}`, [start, end])
  },
}
export { Operators }
