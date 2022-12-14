const data = {
  name: 'proprietarios',
  tableName: 'proprietarios',
  route: 'proprietarios',
  modelName: 'Proprietario',
  transformerName: 'ProprietarioTransformer',
  controllerName: 'ProprietarioController',
  repositoryName: 'ProprietarioRepository',
  filterName: 'ProprietarioFilter',
  transformName: 'ProprietarioTransaformer',
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
      type: 'string',
      name: 'telefone',
      required: false,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },

    {
      type: 'string',
      name: 'cnpj',
      required: false,
      unique: true,
      default: false,
      searchable: true,
      returnTransform: true,
    },
    {
      type: 'string',
      name: 'endereco_cep',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },
    {
      type: 'string',
      name: 'endereco_logradouro',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },
    {
      type: 'string',
      name: 'endereco_bairro',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },
    {
      type: 'string',
      name: 'endereco_cidade',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },
    {
      type: 'string',
      name: 'endereco_uf',
      required: true,
      unique: false,
      default: false,
      searchable: true,
      returnTransform: true,
    },
    // {
    //   type: 'relationship',
    //   name: 'user_id',
    //   references: 'users',
    //   fk: 'id',
    //   typeRelationship: 'hasOne',
    //   onDelete: true,
    //   required: true,
    //   unique: false,
    //   default: false,
    //   searchable: true,
    //   returnTransform: true,
    // },

    // {
    //   type: 'text',
    //   name: 'long_description',
    //   required: false,
    //   unique: false,
    //   default: false,
    // },
    // { type: 'integer', name: 'tipo', required: false, unique: false, default: 2 },
    // { type: 'float', name: 'ponto_flutuante', required: true, unique: false, default: 2 },
    // {
    //   type: 'dateTime',
    //   name: 'data_inicio_default',
    //   required: true,
    //   unique: false,
    //   default: true,
    //   isDate: true,
    // },
    // {
    //   type: 'dateTime',
    //   name: 'data_inicio_obrigatoria',
    //   required: true,
    //   default: false,
    //   isDate: true,
    // },
  ],
  seeds: {
    uniqueKey: 'nome',
    items: [],
  },
}
exports.default = data
