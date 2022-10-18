const data = {
  name: 'Zoneamento',
  tableName: 'zoneamento_servicos',
  route: 'zoneamento-servicos',
  modelName: 'ZoneamentoServico',
  transformerName: 'ZoneamentoServicoTransformer',
  controllerName: 'ZoneamentoServicoController',
  repositoryName: 'ZoneamentoServicoRepository',
  filterName: 'ZoneamentoServicoFilter',
  transformName: 'ZoneamentoServicoTransaformer',
  tableFields: [
    {
      type: 'string',
      name: 'qtd',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },
  ],
  seeds: {
    uniqueKey: 'nome',
    items: [{ nome: 'test' }],
  },
}
exports.default = data
