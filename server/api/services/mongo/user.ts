import * as Mongo from 'mongodb'
import { find } from 'underscore'
import { User } from '../../graphql/resolvers/types'
import { RoleMongoService } from './'
import { MongoDocumentServiceService } from './document'

export class UserMongoService extends MongoDocumentServiceService<User>  {
  private _role: RoleMongoService

  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
   */
  constructor(db: Mongo.Db) {
    super(db, 'users')
    this._role = new RoleMongoService(db)
  }

  /**
   * Get users
   *
   * @param {Mongo.FilterQuery<User>} query Query
   */
  public async getUsers(query?: Mongo.FilterQuery<User>): Promise<User[]> {
    try {
      const [users, roles] = await Promise.all([
        this.find(query),
        this._role.getRoles()
      ])
      return users.map((user) => ({
        ...user,
        role: find(roles, (role) => role.name === user.role)
      }))
    } catch (err) {
      throw err
    }
  }

  /**
   * Get user by ID
   *
   * @param {string} id User ID
   */
  public async getById(id: string) {
    try {
      const user = await this.collection.findOne({ id })
      if (!user.role) throw new Error()
      user.role = await this._role.getByName(user.role as string)
      return user
    } catch (err) {
      throw err
    }
  }

  /**
   * Add user
   *
   * @param {User} user User
   */
  public async addUser(user: User) {
    try {
      const result = await this.collection.insertOne(user)
      return result
    } catch (err) {
      throw err
    }
  }
}
