const { exec } = require('child_process')

const fs = require('fs-extra')
const path = require('path')

module.exports = function (plop) {
  const defaultPath = '../'
  const appPath = '../'

  plop.setHelper('generateMigrationName', (name) => {
    return `${+new Date()}_${name.toLowerCase()}`
  })

  plop.setHelper('json', function (context) {
    return JSON.parse(context)
  })

  plop.setHelper('if_eq', function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this)
  })

  plop.setActionType('getJsonData', function (answers) {
    const { file } = answers
    const { default: modulo } = require(file)

    for (var [key, value] of Object.entries(modulo)) {
      answers[key] = value
    }
  })

  plop.setActionType('postScript', () => {
    exec('yarn format')
  })

  plop.setGenerator('@Inovando/Generator', {
    description: 'Crud Generator based on file seleciton.',
    prompts: [
      {
        type: 'file-tree-selection',
        name: 'file',
        root: 'plop-templates/modules',
        message: 'Pick a config file module (myNewModule.js)',
        basePath: plop.getPlopfilePath(),
      },
    ],
    actions: function (data) {
      const actions = []
      actions.push({
        type: 'getJsonData',
      })

      const createActions = [
        '------------------------------',
        'Create Model      ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/app/Models/{{pascalCase modelName}}.ts`,
          templateFile: 'model.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Generating a new migration   🗑️',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/database/migrations/{{generateMigrationName modelName}}.ts`,
          templateFile: 'migration.hbs',
          skipIfExists: true,
          unique: true,
          abortOnFail: false,
        },
        '------------------------------',
        '|Creating Route Resource      |',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/start/{{dashCase route}}.ts`,
          templateFile: 'route.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Add Route to main route       ',
        '------------------------------',
        {
          type: 'modify',
          path: `${appPath}/start/routes.ts`,

          pattern: /\/\/ generator import/,
          template: "import './{{dashCase route}}'\n// generator import",
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Create Filter      ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/app/Models/Filters/{{pascalCase filterName}}.ts`,
          templateFile: 'filter.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Create Controller      ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/app/Controllers/Http/{{pascalCase controllerName}}.ts`,
          templateFile: 'controller.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Create Transformer      ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/app/Transformers/{{pascalCase transformerName}}.ts`,
          templateFile: 'transformer.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Create Validator      ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/app/Validators/{{pascalCase modelName}}Validator.ts`,
          templateFile: 'validator.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Create Seeder      ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/database/seeders/{{pascalCase modelName}}Seeder.ts`,
          templateFile: 'seeder.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Create Repository             ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/app/Repositories/{{pascalCase repositoryName}}.ts`,
          templateFile: 'repository.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Create Repository Provider    ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/providers/{{pascalCase repositoryName}}Provider.ts`,
          templateFile: 'provider.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },

        '------------------------------',
        'Create Contract Module        ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/contracts/Contract{{pascalCase repositoryName}}.ts`,
          templateFile: 'contracts.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
      ]

      actions.push(
        {
          type: 'appendJSON',
          JSONFile: `${defaultPath}/.adonisrc.json` /* For appendJSONFile  */,
          JSONKey: 'providers' /* JSON key to modify  */,
          JSONEntryValue: './providers/{{pascalCase repositoryName}}Provider',
          abortOnFail: false,
        },
        {
          type: 'postScript',
          abortOnFail: false,
        }
      )

      return [...actions, ...createActions]
    },
  })

  plop.setActionType('appendJSON', function (answers, config) {
    const { repositoryName } = answers
    const { JSONFile, JSONKey } = config

    const jsonPath = JSONFile
    const file = require(jsonPath)

    file[JSONKey].push(`./providers/${repositoryName}Provider`)

    fs.writeFile(path.join(__dirname, jsonPath), JSON.stringify(file, null, 2), function (err) {
      if (err) console.log(err)
    })
  })

  plop.setGenerator('Add RelationShip', {
    description: 'Add relationship to models',
    prompts: [
      {
        type: 'file-tree-selection',
        name: 'file',
        root: 'plop-templates/relationships',
        message: 'Pick a relationship file (modelAHasModelB.js)',
        basePath: plop.getPlopfilePath(),
      },
    ],
    actions: function (data) {
      const actions = []
      actions.push({
        type: 'getJsonData',
      })

      const createActions = [
        '------------------------------',
        'Generate migration   🗑️       ',
        '------------------------------',
        {
          type: 'add',
          path: `${defaultPath}/database/migrations/{{generateMigrationName modelA}}.ts`,
          templateFile: 'belongsTo.hbs',
          skipIfExists: true,
          unique: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Add Filter to Model',
        '------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Models/Filters/{{filterModelA}}.ts`,
          pattern: /\/\/ generator relationship filter/gi,
          templateFile: 'belongsToFilter.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },

        '----------------------------------',
        'Add Transformer avaliable includes',
        '----------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Transformers/{{pascalCase transformerA}}.ts`,
          pattern: /generator_avaliable_include/gi,
          template: "{{snakeCase modelAAtt}}', 'generator_avaliable_include",
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
          skip(respostas) {
            if (!respostas.generator_avaliable_include) {
              return 'Skipped generator_avaliable_include'
            } else {
              // Continue with this action
              return
            }
          },
        },

        '----------------------------------',
        'Add Transformer avaliable Default ',
        '----------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Transformers/{{pascalCase transformerA}}.ts`,
          pattern: /generator_default_include/gi,
          template: "{{snakeCase modelAAtt}}', 'generator_default_include",
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
          skip(respostas) {
            if (!respostas.generator_default_include) {
              return 'Skipped generator_default_include'
            } else {
              // Continue with this action
              return
            }
          },
        },
        '----------------------------------',
        'Add Transformer Default Include',
        '----------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Transformers/{{pascalCase transformerA}}.ts`,
          pattern: /\/\/ generator_add_include/gi,
          templateFile: 'belongsToTransformerInclude.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Add Import Transformer        ',
        '------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Transformers/{{pascalCase transformerA}}.ts`,
          pattern: /\/\/ generator_import_transformer/gi,
          template:
            "import {{pascalCase modelBTransformer}} from 'App/Transformers/{{pascalCase modelBTransformer}}'\n// generator_import_transformer",
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },

        '------------------------------',
        'Add Import Relationship model',
        '------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Models/{{modelA}}.ts`,
          pattern: /\/\/ generator_import_relationship/gi,
          template:
            "import {{pascalCase modelB}} from 'App/Models/{{pascalCase modelB}}'\n// generator_import_relationship",
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Add Relationship to model     ',
        '------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Models/{{pascalCase modelA}}.ts`,
          pattern: /\/\/ generator_relationship_model/gi,
          templateFile: 'belongsToModel.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
        },
        '------------------------------',
        'Add Validator to relationship ',
        '------------------------------',
        {
          type: 'modify',
          path: `${appPath}/app/Validators/{{pascalCase modelA}}Validator.ts`,
          pattern: /\/\/ generator_validator/gi,
          templateFile: 'belongsToValidator.hbs',
          unique: true,
          skipIfExists: true,
          abortOnFail: false,
          skip: (respostas) => {
            if (!respostas.required) {
              return 'Skipped validator relationship'
            } else {
              // Continue with this action
              return
            }
          },
        },
      ]

      //format code
      actions.push({
        type: 'postScript',
      })
      return [...actions, ...createActions]
    },
  })
  plop.setGenerator('RunFile', {
    description: 'this is a test generator',

    prompts: [
      {
        type: 'input',
        name: 'repositoryName',
        message: 'repositoryName name please',
      },
    ],
    actions: [
      '------------------------------',
      'Set Repository Provider    ',
      '------------------------------',
      {
        type: 'appendJSON',
        JSONFile: `${defaultPath}/.adonisrc.json` /* For appendJSONFile  */,
        JSONKey: 'providers' /* JSON key to modify: routes: {} || [] */,
        JSONEntryValue: './providers/{{pascalCase repositoryName}}Provider',
      },
    ],
  })

  plop.setGenerator('Gera Testes', {
    description: 'Generate Functional Test for a Entity',

    prompts: [
      {
        type: 'input',
        name: 'modelToTest',
        message: 'Qual o model a ser testado',
      },
      {
        type: 'input',
        name: 'urlToTest',
        message: 'Qual a url do recurso',
      },
    ],
    actions: [
      '------------------------------',
      'Generate Test                 ',
      '------------------------------',
      {
        type: 'add',
        path: `${defaultPath}/test/{{pascalCase modelToTest}}.spec.ts`,
        templateFile: 'tests/testFunction.hbs',
        skipIfExists: true,
        unique: true,
        abortOnFail: true,
      },
    ],
  })

  //Gerador
  // Pronts -> entrada de dados (json)
  // Actions -> O que sera gerado a partir dos dados do input
}
