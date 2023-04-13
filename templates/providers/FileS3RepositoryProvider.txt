import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class FileS3RepositoryProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {}

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    const FileS3Repository = (await import('App/Repositories/FileS3Repository')).default
    return this.app.container.bind('FileS3Repository', () => new FileS3Repository())
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
