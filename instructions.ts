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

  console.log('Coping Prividers')
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

  // Coby Controllers
  // console.log('Coping Controllers')
  // const controllersPath = `${projectRoot}/app/Controllers/Http`
  // console.log({ controllersPath, projectRoot })
  // if (!fs.existsSync(controllersPath)) {
  //   fs.mkdirSync(modelPath, { recursive: true })
  // }

  // // 3. Copy models
  // const modelPath = `${projectRoot}/app/Models`
  // if (!fs.existsSync(modelPath)) {
  //   fs.mkdirSync(modelPath, { recursive: true })
  // }
  // fs.copyFileSync(`${packageBasePath}/models/Permission.txt`, `${modelPath}/Permission.ts`)
  // fs.copyFileSync(`${packageBasePath}/models/Role.txt`, `${modelPath}/Role.ts`)
  // fs.copyFileSync(`${packageBasePath}/models/RolePermission.txt`, `${modelPath}/RolePermission.ts`)
  // fs.copyFileSync(`${packageBasePath}/models/UserPermission.txt`, `${modelPath}/UserPermission.ts`)
  // fs.copyFileSync(`${packageBasePath}/models/UserRole.txt`, `${modelPath}/UserRole.ts`)

  // // 4. Copy migrations
  // const migrationPath = `${projectRoot}/database/migrations`
  // if (!fs.existsSync(migrationPath)) {
  //   fs.mkdirSync(migrationPath, { recursive: true })
  // }
  // fs.copyFileSync(
  //   `${packageBasePath}/migrations/acl_1_roles.txt`,
  //   `${migrationPath}/acl_1_roles.ts`
  // )
  // fs.copyFileSync(
  //   `${packageBasePath}/migrations/acl_2_permissions.txt`,
  //   `${migrationPath}/acl_2_permissions.ts`
  // )
  // fs.copyFileSync(
  //   `${packageBasePath}/migrations/acl_3_role_permissions.txt`,
  //   `${migrationPath}/acl_3_role_permissions.ts`
  // )
  // fs.copyFileSync(
  //   `${packageBasePath}/migrations/acl_4_user_permissions.txt`,
  //   `${migrationPath}/acl_4_user_permissions.ts`
  // )
  // fs.copyFileSync(
  //   `${packageBasePath}/migrations/acl_5_user_roles.txt`,
  //   `${migrationPath}/acl_5_user_roles.ts`
  // )
}
