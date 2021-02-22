/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { ApiTokenMongoService } from './apitoken'
import { CustomerMongoService } from './customer'
import { LabelMongoService } from './label'
import { ProjectMongoService } from './project'
import { ReportsMongoService } from './reports'
import { RoleMongoService } from './role'
import { SubscriptionMongoService } from './subscription'
import { UserMongoService } from './user'

@Service({ global: false })
export class MongoService {
  /**
   * Constructor
   *
   * @param {Context} context Context
   */
  constructor(@Inject('CONTEXT') private readonly context: Context) {}

  public get user(): UserMongoService {
    return new UserMongoService(this.context.db)
  }

  public get role(): RoleMongoService {
    return new RoleMongoService(this.context.db)
  }

  public get subscription(): SubscriptionMongoService {
    return new SubscriptionMongoService(this.context.db)
  }

  public get project(): ProjectMongoService {
    return new ProjectMongoService(this.context.db)
  }

  public get customer(): CustomerMongoService {
    return new CustomerMongoService(this.context.db)
  }

  public get label(): LabelMongoService {
    return new LabelMongoService(this.context.db)
  }

  public get reports(): ReportsMongoService {
    return new ReportsMongoService(this.context.db)
  }

  public get apiToken(): ApiTokenMongoService {
    return new ApiTokenMongoService(this.context.db)
  }
}

export {
  UserMongoService,
  RoleMongoService,
  SubscriptionMongoService,
  ProjectMongoService,
  CustomerMongoService,
  ReportsMongoService,
  ApiTokenMongoService
}
