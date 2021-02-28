/* eslint-disable @typescript-eslint/no-var-requires */
import { FilterQuery } from 'mongodb'
import set from 'set-value'
import { find, omit } from 'underscore'
import { RoleService } from '.'
import { Context } from '../../graphql/context'
import { User } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

export class UserService extends MongoDocumentService<User> {
  private _role: RoleService

  constructor(context: Context) {
    super(context, 'users')
    this._role = new RoleService(context)
  }

  /**
   * Replace id with _id for the User Object
   *
   * @remarks We want to store the user with _id in the mongodb collection, but
   * use id when working with the user in our code.
   *
   * @param user - User
   */
  private _replaceId<T>(user: User): T {
    return ({ ...omit(user, 'id'), _id: user.id } as unknown) as T
  }

  /**
   * Get users by the specified query
   *
   * @param query - Query
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
    } catch (error) {
      throw error
    }
  }

  /**
   * Get user by ID
   *
   * @param id - User ID
   */
  public async getById(id: string) {
    try {
      const user = await this.collection.findOne({ _id: id })
      if (!user.role) throw new Error(`The user ${id} has no role set.`)
      user.id = user._id
      user.role = await this._role.getByName(user.role as string)
      user.configuration = JSON.stringify(user.configuration)
      return user
    } catch (error) {
      throw error
    }
  }

  /**
   * Add the specified user object
   *
   * @param user - User
   */
  public async addUser(user: User) {
    try {
      const result = await this.collection.insertOne(this._replaceId(user))
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Add users
   *
   * @param users - Users
   */
  public async addUsers(users: User[]) {
    try {
      const result = await this.collection.insertMany(
        users.map((u) => this._replaceId(u))
      )
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Update the specified user
   *
   * @param user - User to update
   */
  public async updateUser(user: User): Promise<void> {
    try {
      await this.collection.updateOne({ _id: user.id }, { $set: user })
    } catch (error) {
      throw error
    }
  }

  /**
   * Update configuration for the current user
   *
   * @remarks For now we we're working with the configuration as a string,
   * to avoid typing the whole configuration object.
   *
   * @param configuration - Configuration
   */
  public async updateCurrentUserConfiguration(configuration: string) {
    try {
      const filter = { _id: this.context.userId }
      const user = await this.collection.findOne(filter)
      const _configuration = JSON.parse(configuration)
      const mergedConfiguration = Object.keys(_configuration).reduce(
        (object, key) => {
          set(object, key, _configuration[key])
          return object
        },
        user.configuration
      )
      await this.collection.updateOne(filter, {
        $set: { configuration: mergedConfiguration }
      })
    } catch (error) {
      throw error
    }
  }
}
