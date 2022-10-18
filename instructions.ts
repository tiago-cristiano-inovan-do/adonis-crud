import fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'

export default async function instructions(projectRoot: string) {
  const packageBasePath = path.resolve(`${__dirname}/templates`)

  // Copy BaseTransformer
  const transformerPath = `${projectRoot}/app/Transformers`
  if (!fs.existsSync(transformerPath)) {
    fs.mkdirSync(transformerPath, { recursive: true })
  }

  fs.copyFileSync(
    `${packageBasePath}/Transformer/BaseTransformer.txt`,
    `${transformerPath}/BaseTransformer.ts`,
    fs.constants.COPYFILE_FICLONE
  )

  // Coby BaseCrudModel
  const modelPath = `${projectRoot}/app/Models`
  if (!fs.existsSync(modelPath)) {
    fs.mkdirSync(modelPath, { recursive: true })
  }

  fs.copyFileSync(`${packageBasePath}/Models/BaseCrudModel.txt`, `${modelPath}/BaseCrudModel.ts`)

  // Copy CodeGen
  const codeGemPath = `${projectRoot}/codegem`
  console.log({ codeGemPath, packageBasePath })
  if (!fs.existsSync(codeGemPath)) {
    fs.mkdirSync(codeGemPath, { recursive: true })
  }
  fsExtra.copy(`${packageBasePath}/codegem`, codeGemPath)

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
