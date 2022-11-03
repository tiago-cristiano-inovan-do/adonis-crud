import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserProfiles extends BaseSchema {
  protected tableName = 'user_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').unsigned().references('users.id')
      table.uuid('profile_id').unsigned().references('profiles.id')
      table.unique(['user_id', 'profile_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
