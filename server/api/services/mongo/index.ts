/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../../graphql/context'
import { UserMongoService } from './user'

@Service({ global: false })
export class MongoService {
  /**
   * Constructor
   *
   * @param {string} connectionString Connection string
   */
  constructor(@Inject('CONTEXT') private readonly context: Context) {

  }

  public get user(): UserMongoService {
    return new UserMongoService(this.context.client.db('test'))
  }
}