const data = {
  name: 'zonemento',
  tableName: 'zoneamentos',
  route: 'zoneamentos',
  modelName: 'Zoneamento',
  transformerName: 'ZoneamentoTransformer',
  controllerName: 'ZoneamentoController',
  repositoryName: 'ZoneamentoRepository',
  filterName: 'ZoneamentoFilter',
  transformName: 'ZoneamentoTransaformer',
  tableFields: [
    {
      type: 'string',
      name: 'nome',
      required: true,
      unique: true,
      default: false,
      searchable: true,
      returnTransform: true,
    },
    {
      type: 'integer',
      name: 'status_zoneamento',
      required: true,
      unique: false,
      default: '0',
      searchable: true,
      returnTransform: true,
    },
  ],
  seeds: {
    uniqueKey: 'nome',
    items: [{ nome: 'Primus' }],
  },
}
exports.default = data
