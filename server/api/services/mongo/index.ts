/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { RoleMongoService } from './role'
import { SubscriptionMongoService } from './subscription'
import { UserMongoService } from './user'
import { ProjectMongoService } from './project'

@Service({ global: false })
export class MongoService {
  /**
   * Constructor
   *
   * @param {string} connectionString Connection string
   */
  constructor(@Inject('CONTEXT') private readonly context: Context) {}

  public get user(): UserMongoService {
    return new UserMongoService(this.context.client.db('test'))
  }

  public get role(): RoleMongoService {
    return new RoleMongoService(this.context.client.db('test'))
  }

  public get subscription(): SubscriptionMongoService {
    return new SubscriptionMongoService(this.context.client.db('test'))
  }
}

export {
  UserMongoService,
  RoleMongoService,
  SubscriptionMongoService,
  ProjectMongoService
}