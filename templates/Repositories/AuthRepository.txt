import User from 'App/Models/User'

export default class AuthRepository {
  public model
  constructor() {
    this.model = User
  }
  public async login({ email, password, auth }) {
    await this.checkUserActive({ email })
    const token = await auth.use('api').attempt(email, password)
    return token
  }

  private async checkUserActive({ email }) {
    const user = await this.model.findBy('email', email)
    if (!user?.status) {
      throw new Error('Inative Users cant login')
    }
  }

  public async me({ user }) {
    const fullUser = await this.model.query().preload('profiles').where('id', user.id).first()

    console.log('fullUser :', fullUser)
    return fullUser
  }
}
