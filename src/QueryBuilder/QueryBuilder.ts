import { Operator, Operators } from './QueryOperators'

const keysToIgnorePagination = ['page', 'perPage', 'all', 'include']
const orderAndSortToIgnore = ['order', 'sort']
const queryOpertosToIgnore = [
  'select_fields',
  'where_operator',
  'select_fields_relationships',
  'order_fields_relationships',
  'relation_join_key',
  'relational_pivot_table',
  'relational_local_key',
]

const keysToIgnore = keysToIgnorePagination
  .concat(orderAndSortToIgnore)
  .concat(queryOpertosToIgnore)

export class QueryBuilder {
  private static hasInclude(model, includes: any = []) {
    let includesNotAvailables: any = []

    for (const include of includes) {
      const [first] = include.split('.')

      if (!model.$hasRelation(first)) {
        includesNotAvailables.push(include)
      }
    }

    if (includesNotAvailables.length) {
      throw new Error(`invalid relations includes ${includesNotAvailables.map((e) => e)}`)
    }
  }
  private static handleOrderAndSort({
    query,
    order_fields_relationships,
    relational_pivot_table,
    relational_join_key,
    model,
    relational_local_key,
  }) {
    const [key] = Object.keys(order_fields_relationships)

    let joinParams = [key]

    if (relational_pivot_table[key]) {
      joinParams = relational_pivot_table[key].split(',')

      if (joinParams.length > 3) return

      const [table, localKey, fk] = joinParams

      query.join(table, localKey, fk)

      query.join(
        key,
        `${joinParams[0]}.${relational_join_key[key]}`,
        `${model.table}.${relational_local_key[key]}`
      )
    }

    const [sort, order] = order_fields_relationships[key].split(',')

    query.join(
      key,
      `${key}.${relational_join_key[key]}`,
      `${model.table}.${relational_local_key[key]}`
    )
    query.orderBy(sort, order)
  }

  private static applyOrder(query, qs) {
    query.orderBy(qs.sort, qs.order)
  }

  public static build({ model, qs, selectFields }): any {
    const selectFieldsQs = qs.select_fields?.split(',') || []
    const mergedSelectFields = new Set(selectFields.concat(selectFieldsQs))

    const query = model.query().select([...mergedSelectFields] as unknown as Array<string>)
    const whereOperator = qs?.where_operator || 'and'
    const includes = this.splitAndTrim(qs.include)

    this.handleIncludes(query, includes, qs.select_fields_relationships, model)
    this.handleQueryStringParameters(query, qs, whereOperator)
    this.applyOrder(query, qs)
    return query
  }

  private static handleSecondRelation(
    query: any,
    firstRelation: string,
    secondRelation: string,
    selectFieldsRelation: string[],
    fieldsRelationsShips: any
  ) {
    query.preload(`${firstRelation}`, (q) => {
      q.select(selectFieldsRelation)
      q.preload(`${secondRelation}`, (queryB) => {
        const selectFieldsSecondRelation = this.splitAndTrim(fieldsRelationsShips[secondRelation])
        if (selectFieldsSecondRelation)
          queryB.select(`${secondRelation}.${selectFieldsSecondRelation}`)
      })
    })
  }

  private static splitAndTrim(str: string): string[] {
    return (
      str
        ?.split(',')
        .filter((item) => item !== '')
        .map((item) => item.trim()) || []
    )
  }

  private static handleIncludes(query: any, includes: string[], fieldsRelationsShips: any, model) {
    for (const include of includes) {
      const [firstRelation, secondRelation] = include.split('.')

      if (firstRelation && !secondRelation) {
        this.hasInclude(model, includes)
      }

      const selectFieldsRelation = this.splitAndTrim(fieldsRelationsShips[firstRelation])
      const formatSelectFields = selectFieldsRelation.map((e) => `${firstRelation}.${e}`)
      if (secondRelation) {
        const secondRelationSelectFieldsRelation = this.splitAndTrim(
          fieldsRelationsShips[secondRelation]
        )
        const secondfRelationFormatSelectFields = secondRelationSelectFieldsRelation.map(
          (e) => `${secondRelation}.${e}`
        )

        this.handleSecondRelation(
          query,
          firstRelation,
          secondRelation,
          secondfRelationFormatSelectFields,
          fieldsRelationsShips
        )
      }

      if (!secondRelation) {
        query.preload(include, (q) => {
          if (formatSelectFields.length) q.select(formatSelectFields)
        })
      }
    }
  }
  private static parseBooleanParams(value) {
    const booleans = { ['true']: true, ['false']: false }
    return value.split(',').map((e) => booleans[e])
  }

  private static handleQueryStringParameters(query: any, qs: any, whereOperator: string) {
    for (const key in qs) {
      if (keysToIgnore.includes(key)) continue
      let value = qs[key]
      let parts = key.split('.')

      let param = parts[0]

      if (param === 'status') {
        value = this.parseBooleanParams(value)
      }
      const scenarios = {
        3: () => this.handleThreePartKey(query, parts, value, whereOperator),
        2: () => this.handleTwoPartKey(query, parts, value, whereOperator),
        1: () => this.handleOnePartKey(query, param, value, whereOperator),
      }

      const scenario = scenarios[parts.length]
      if (scenario) {
        scenario()
      }
    }
  }

  private static handleThreePartKey(
    query: any,
    parts: string[],
    value: any,
    whereOperator: string
  ) {
    const [relation, field, op] = parts
    let operator = op.startsWith('$') ? (op as Operator) : Operator.Equals
    query.whereHas(relation, (subQuery) => {
      Operators[operator]({ query: subQuery, param: field, value, relation, whereOperator })
    })
  }

  private static handleTwoPartKey(query: any, parts: string[], value: any, whereOperator: string) {
    const [first, second] = parts
    let operator: any = second as Operator
    if (second.startsWith('$')) {
      Operators[operator]({ query, param: first, value, whereOperator })
    } else {
      query.whereHas(first, (subQuery) => {
        Operators[operator]({ query: subQuery, param: second, value, whereOperator })
      })
    }
  }

  private static handleOnePartKey(query: any, param: string, value: any, whereOperator: string) {
    let operator: any = Operator.Equals
    Operators[operator]({ query, param, value, whereOperator })
  }
}
