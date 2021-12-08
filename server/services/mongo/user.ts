/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import { FilterQuery } from 'mongodb'
import set from 'set-value'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { RoleService } from '.'
import { Context } from '../../graphql/context'
import { User } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

/**
 * User service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class UserService extends MongoDocumentService<User> {
  private _role: RoleService

  /**
   * Constructor for `UserService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
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
    return { ..._.omit(user, 'id'), _id: user.id } as unknown as T
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
        role: _.find(roles, (role) => role.name === user.role),
        configuration: JSON.stringify(user.configuration)
      }))
    } catch (error) {
      throw error
    }
  }

  /**
   * Get user by ID
   *
   * @remarks Returns null if no user is found.
   *
   * @param idOrMail - User ID or mail
   */
  public async getById(idOrMail: string): Promise<User> {
    try {
      const user = await this.collection.findOne({
        $or: [{ _id: idOrMail }, { mail: idOrMail }]
      })
      if (!user) return null
      if (!user.role) throw new Error(`The user ${idOrMail} has no role set.`)
      user.id = user._id
      user.role = await this._role.getByName(user.role as string)
      user.configuration = JSON.stringify(user.configuration)
      return user
    } catch (error) {
      throw error
    }
  }

  /**
   * Get configuration by user ID
   *
   * @remarks Returns null if no user is found.
   *
   * @param idOrMail - User ID or mail
   */
  public async getUserConfiguration(idOrMail: string): Promise<any> {
    try {
      const user = await this.collection.findOne({
        $or: [{ _id: idOrMail }, { mail: idOrMail }]
      })
      if (!user) return null
      return user.configuration
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
      const result = await this.insert(this._replaceId(user))
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Add multiple users in bulk
   *
   * @param users_ - Users
   */
  public async addUsers(users_: User[]) {
    try {
      const users = users_.map((u) => this._replaceId(u))
      return await this.insertMultiple(users)
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
      await this.update({ _id: user.id }, user)
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
   * @param startPage - Start page
   * @param preferredLanguage - Preferred language
   */
  public async updateCurrentUserConfiguration(
    configuration?: string,
    startPage?: string,
    lastActive?: string,
    preferredLanguage?: string
  ) {
    try {
      const filter = { _id: this.context.userId }
      const $set: User = {}
      if (configuration) {
        const user = await this.collection.findOne(filter)
        const _configuration = JSON.parse(configuration)
        // eslint-disable-next-line unicorn/no-array-reduce
        $set.configuration = Object.keys(_configuration).reduce(
          (object, key) => {
            set(object, key, _configuration[key])
            return object
          },
          user.configuration || {}
        )
      }
      if (startPage) $set.startPage = startPage
      if (preferredLanguage) $set.preferredLanguage = preferredLanguage
      if (lastActive) $set.lastActive = new Date(lastActive)
      await this.update(filter, $set)
    } catch (error) {
      throw error
    }
  }
}
