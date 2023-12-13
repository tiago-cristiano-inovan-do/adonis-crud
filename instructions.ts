import fs from 'fs'
import path from 'path'
const packageBasePath = path.resolve(`${__dirname}/templates`)

const copyFolderToProjetct = ({ pathDestiny, folder, noCaptlize = false }) => {
  const capitalizedFolder = noCaptlize ? folder : folder[0].toUpperCase() + folder.slice(1)

  if (!fs.existsSync(pathDestiny)) {
    fs.mkdirSync(pathDestiny, { recursive: true })
  }
  console.log(`Coping to${folder} to project folder...`)

  fs.readdirSync(`${packageBasePath}/${capitalizedFolder}`).forEach((file) => {
    const [fileName, extension] = file.split('.')
    fs.copyFileSync(
      `${packageBasePath}/${capitalizedFolder}/${fileName}.${extension}`,
      `${pathDestiny}/${fileName}.ts`,
      fs.constants.COPYFILE_FICLONE
    )
  })
}

export default async function instructions(projectRoot: string) {
  console.log('Coping Transformers')
  const transformerPath = `${projectRoot}/app/Transformers`

  copyFolderToProjetct({ pathDestiny: transformerPath, folder: 'Transformers' })

  console.log('Coping Repository')
  const RepositoryPath = `${projectRoot}/app/Repositories`
  copyFolderToProjetct({ pathDestiny: RepositoryPath, folder: 'Repositories' })

  console.log('Coping Models')
  const modelPath = `${projectRoot}/app/Models`
  copyFolderToProjetct({ pathDestiny: modelPath, folder: 'Models' })

  console.log('Coping Controller')
  const controllerPath = `${projectRoot}/app/Controllers/Http`
  copyFolderToProjetct({ pathDestiny: controllerPath, folder: 'Controllers' })

  console.log('Coping Providers')
  const providersPath = `${projectRoot}/providers`
  copyFolderToProjetct({ pathDestiny: providersPath, folder: 'providers', noCaptlize: true })

  console.log('Coping DatabaseFiles (Migrations)')
  const dataBasePath = `${projectRoot}/database/migrations`
  copyFolderToProjetct({
    pathDestiny: dataBasePath,
    folder: 'database/migrations',
    noCaptlize: true,
  })

  console.log('Coping DatabaseFiles (seeds)')
  const dataBaseSeedsPath = `${projectRoot}/database/seeders`
  copyFolderToProjetct({
    pathDestiny: dataBaseSeedsPath,
    folder: 'database/seeders',
    noCaptlize: true,
  })

  console.log('Coping DatabaseFiles (factories)')
  const dataBaseFactoriesPath = `${projectRoot}/database/factories`
  copyFolderToProjetct({
    pathDestiny: dataBaseFactoriesPath,
    folder: 'database/factories',
    noCaptlize: true,
  })

  console.log('Coping code-templates')
  const codeTemplatesPath = `${projectRoot}/code-templates`
  copyFolderToProjetct({
    pathDestiny: codeTemplatesPath,
    folder: 'code-templates',
    noCaptlize: true,
  })
}
