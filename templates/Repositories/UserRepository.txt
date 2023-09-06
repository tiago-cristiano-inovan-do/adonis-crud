import { CrudRepository } from '@ioc:AdonisCrud/Crud/Repository'
import User from 'App/Models/User'

@CrudRepository(User)
export default class UserRepository {}
