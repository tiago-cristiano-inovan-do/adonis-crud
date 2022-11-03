import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'senha123',
  }
}).build()

export { UserFactory }
