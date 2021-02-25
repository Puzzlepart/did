import { Db as MongoDatabase, FilterQuery } from 'mongodb'
import { find, omit, pick } from 'underscore'
import { RoleService } from '.'
import { User } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

export class UserService extends MongoDocumentService<User> {
  private _role: RoleService

  /**
   * Constructor
   *
   * @param {MongoDatabase} db Mongo database
   */
  constructor(db: MongoDatabase) {
    super(db, 'users')
    this._role = new RoleService(db)
  }

  /**
   * Replace id with _id
   *
   * @param {User} user User
   */
  private _replaceId<T>(user: User): T {
    return ({ ...omit(user, 'id'), _id: user.id } as unknown) as T
  }

  /**
   * Get users
   *
   * @param {FilterQuery<User>} query Query
   */
  public async getUsers(query?: FilterQuery<User>): Promise<User[]> {
    try {
      const [users, roles] = await Promise.all([
        this.find(query, { displayName: 1 }),
        this._role.getRoles()
      ])
      return users.map((user) => ({
        ...user,
        id: user['_id'],
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
      const user = await this.collection.findOne({ _id: id })
      if (!user.role) throw new Error()
      user.id = user._id
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
      const result = await this.collection.insertOne(this._replaceId(user))
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
      const result = await this.collection.insertMany(users.map((u) => this._replaceId(u)))
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
