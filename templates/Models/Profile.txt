import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseCrudModel from './BaseCrudModel'
export default class Profile extends BaseCrudModel {
  @column()
  public name: string
}
