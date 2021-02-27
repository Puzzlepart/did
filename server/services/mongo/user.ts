/* eslint-disable @typescript-eslint/no-var-requires */
import { FilterQuery } from 'mongodb'
import { find, omit } from 'underscore'
import { RoleService } from '.'
import { Context } from '../../graphql/context'
import { User } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'
import set from 'set-value'

export class UserService extends MongoDocumentService<User> {
  private _role: RoleService

  constructor(context: Context) {
    super(context, 'users')
    this._role = new RoleService(context)
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
        role: find(roles, (role) => role.name === user.role),
        configuration: JSON.stringify(user.configuration)
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
      user.configuration = JSON.stringify(user.configuration)
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
      const result = await this.collection.insertMany(
        users.map((u) => this._replaceId(u))
      )
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
      await this.collection.updateOne({ _id: user.id }, { $set: user })
    } catch (err) {
      throw err
    }
  }

  /**
   * Update current user configuration
   *
   * @param {string} configuration Configuration
   */
  public async updateCurrentUserConfiguration(configuration: string) {
    try {
      const filter = { _id: this.context.userId }
      const user = await this.collection.findOne(filter)
      const _configuration = JSON.parse(configuration)
      const mergedConfiguration = Object.keys(_configuration).reduce(
        (obj, key) => {
          set(obj, key, _configuration[key])
          return obj
        },
        user.configuration
      )
      await this.collection.updateOne(filter, {
        $set: { configuration: mergedConfiguration }
      })
    } catch (err) {
      throw err
    }
  }
}
