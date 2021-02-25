/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { CacheService } from '../cache'
import { ApiTokenService } from './apitoken'
import { CustomerService } from './customer'
import { LabelService } from './label'
import { ProjectService } from './project'
import { ReportsService } from './reports'
import { RoleService } from './role'
import { SubscriptionService } from './subscription'
import { UserService } from './user'

@Service({ global: false })
export class MongoService {
  /**
   * Constructor
   *
   * @param {Context} context Context
   * @param {CacheService} _cache Cache service
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _cache?: CacheService
  ) {}

  public get user(): UserService {
    return new UserService(this.context.db)
  }

  public get role(): RoleService {
    return new RoleService(this.context.db)
  }

  public get subscription(): SubscriptionService {
    return new SubscriptionService(this.context.db)
  }

  public get project(): ProjectService {
    return new ProjectService(this.context.db, this._cache)
  }

  public get customer(): CustomerService {
    return new CustomerService(this.context.db)
  }

  public get label(): LabelService {
    return new LabelService(this.context.db)
  }

  public get reports(): ReportsService {
    return new ReportsService(this.context.db, this._cache)
  }

  public get apiToken(): ApiTokenService {
    return new ApiTokenService(this.context.db)
  }
}

export {
  UserService,
  RoleService,
  SubscriptionService,
  ProjectService,
  CustomerService,
  ReportsService,
  ApiTokenService
}
