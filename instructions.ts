import fs from 'fs'
import path from 'path'
const packageBasePath = path.resolve(`${__dirname}/templates`)

const copyFolderToProjetct = ({ pathDestiny, folder }) => {
  const capitalizedFolder = folder[0].toUpperCase() + folder.slice(1)

  if (!fs.existsSync(pathDestiny)) {
    fs.mkdirSync(pathDestiny, { recursive: true })
  }
  console.log('Coping models to project folder...')

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
  const transformerPath = `${projectRoot}/app/Transformer`
  copyFolderToProjetct({ pathDestiny: transformerPath, folder: 'Tranformers' })

  // Coby Models
  console.log('Coping BaseCrudModel')
  console.log('Creating Models folder if not exist')
  const modelPath = `${projectRoot}/app/Models`
  copyFolderToProjetct({ pathDestiny: modelPath, folder: 'Models' })

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
