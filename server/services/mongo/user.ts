import { Db as MongoDatabase, FilterQuery } from 'mongodb'
import { find, pick } from 'underscore'
import { RoleMongoService } from '.'
import { User } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

export class UserMongoService extends MongoDocumentService<User> {
  private _role: RoleMongoService

  /**
   * Constructor
   *
   * @param {MongoDatabase} db Mongo database
   */
  constructor(db: MongoDatabase) {
    super(db, 'users')
    this._role = new RoleMongoService(db)
  }

  /**
   * Get users
   *
   * @param {FilterQuery<User>} query Query
   */
  public async getUsers(query?: FilterQuery<User>): Promise<User[]> {
    try {
      const [users, roles] = await Promise.all([this.find(query), this._role.getRoles()])
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

  /**
   * Add users
   *
   * @param {User[]} users Users
   */
  public async addUsers(users: User[]) {
    try {
      const result = await this.collection.insertMany(users)
      return result
    } catch (err) {
      throw err
    }
  }

  /**
   * Update customer
   *
   * @param {User} user User to update
   */
  public async updateUser(user: User): Promise<void> {
    try {
      await this.collection.updateOne(pick(user, 'id'), { $set: user })
    } catch (err) {
      throw err
    }
  }
}
