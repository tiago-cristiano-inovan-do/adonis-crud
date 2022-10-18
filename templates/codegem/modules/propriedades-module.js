const data = {
  name: 'Propriedade',
  tableName: 'propriedades',
  route: 'propriedades',
  modelName: 'Propriedade',
  transformerName: 'PropriedadeTransformer',
  controllerName: 'PropriedadeController',
  repositoryName: 'PropriedadeRepository',
  filterName: 'PropriedadeFilter',
  transformName: 'PropriedadeTransaformer',
  tableFields: [
    {
      type: 'string',
      name: 'nome',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },

    {
      type: 'string',
      name: 'un',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },

    {
      type: 'float',
      name: 'quantidade',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },

    {
      type: 'string',
      name: 'descricao',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },
  ],
  seeds: {
    uniqueKey: 'nome',
    items: [],
  },
}
exports.default = data
