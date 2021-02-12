/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../graphql/context'

@Service({ global: false })
export class MongoService {
  /**
   * Constructor
   */
  constructor(@Inject('CONTEXT') private readonly context: Context) {
  }
}