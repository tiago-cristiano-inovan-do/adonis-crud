import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Profile from 'App/Models/Profile'
export default class ProfileSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'

    const itens = [
      {
        name: 'ROOT',
      },

      {
        name: 'DEFAULT',
      },
    ]
    await Profile.updateOrCreateMany(uniqueKey, itens)
  }
}
