/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
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
   */
  constructor(@Inject('CONTEXT') private readonly context: Context) {}

  public get user(): UserService {
    return new UserService(this.context)
  }

  public get role(): RoleService {
    return new RoleService(this.context)
  }

  public get subscription(): SubscriptionService {
    return new SubscriptionService(this.context)
  }

  public get project(): ProjectService {
    return new ProjectService(this.context)
  }

  public get customer(): CustomerService {
    return new CustomerService(this.context)
  }

  public get label(): LabelService {
    return new LabelService(this.context)
  }

  public get reports(): ReportsService {
    return new ReportsService(this.context)
  }

  public get apiToken(): ApiTokenService {
    return new ApiTokenService(this.context)
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
