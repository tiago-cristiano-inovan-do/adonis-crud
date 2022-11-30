interface OperatorQueryParam {
  query: any
  param: any
  value: any
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
}
export { Operators }
