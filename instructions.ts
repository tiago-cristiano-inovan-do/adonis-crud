//@ts-ignore
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'

type InstructionsState = {}
//@ts-ignore
function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

//@ts-ignore
export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const state: InstructionsState = {}

  console.log(projectRoot, app, sink, state)

  // Your implementation goes here
}
