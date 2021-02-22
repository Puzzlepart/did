import { Db } from 'mongodb'
import 'reflect-metadata'
import { NotificationTemplates } from 'server/graphql/resolvers/types'
import { Inject, Service } from 'typedi'
import { Context } from '../graphql/context'
import { MongoService } from './mongo'

@Service({ global: false })
export class NotificationService {
  private _db: Db
  /**
   * Constructor
   *
   * @param {Context} context Context
   * @param {MongoService} _mongo MongoService
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _mongo: MongoService
  ) {
    this._db = this.context.client.db('test')
  }

  public getNotifications(templates: NotificationTemplates, locale: string) {
    // eslint-disable-next-line no-console
    console.log(templates, locale, this._db.slaveOk)
    return []
  }
}
