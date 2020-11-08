/* eslint-disable max-classes-per-file */
import arraySort from 'array-sort'
import { createTableService } from 'azure-storage'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { omit, pick } from 'underscore'
import { getDurationHours } from '../../utils/date'
import AzTableUtilities from '../../utils/table'
import { Context } from '../graphql/context'
import { Role } from '../graphql/resolvers/types'

export class AzStorageServiceTables {
  constructor(
    public timeEntries: string = 'TimeEntries',
    public forecastedTimeEntries: string = 'ForecastedTimeEntries',
    public confirmedPeriods: string = 'ConfirmedPeriods',
    public forecastedPeriods: string = 'ForecastedPeriods',
    public projects: string = 'Projects',
    public customers: string = 'Customers',
    public roles: string = 'Roles',
    public labels: string = 'Labels',
    public users: string = 'Users'
  ) {}
}

@Service({ global: false })
class AzStorageService {
  public tableUtil: AzTableUtilities
  public tables: AzStorageServiceTables

  /**
   * Constructor
   *
   * @param {string} connectionString Connection string
   */
  constructor(@Inject('CONTEXT') private readonly context: Context) {
    this.tableUtil = new AzTableUtilities(createTableService(this.context.subscription.connectionString))
    this.tables = new AzStorageServiceTables()
  }

  /**
   * Get labels from table Labels
   */
  async getLabels() {
    const query = this.tableUtil.createAzQuery(1000)
    const { entries } = await this.tableUtil.queryAzTable(this.tables.labels, query, {
      columnMap: {
        RowKey: 'name'
      }
    })
    return entries
  }

  /**
   * Create label in table Labels
   *
   * @param {any} label Label data
   * @param {string} createdBy Created by ID
   * @param {boolean} update Update the existing label
   */
  async addOrUpdateLabel(label: any, createdBy: string, update: boolean) {
    const entity = this.tableUtil.convertToAzEntity(label.name, {
      ...omit(label, 'name'),
      createdBy
    })
    let result: any
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.labels, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.labels, entity)
    return result
  }

  /**
   * Delete label from table Labels
   *
   * @param {string} name Label name
   */
  async deleteLabel(name: string) {
    const { string } = this.tableUtil.azEntGen()
    try {
      const result = await this.tableUtil.deleteEntity(this.tables.labels, {
        PartitionKey: string('Default'),
        RowKey: string(name)
      })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Get customers from table Customers
   *
   * @param {{ sortBy?: string }} options Options
   */
  async getCustomers(options: { sortBy?: string } = {}) {
    const query = this.tableUtil.createAzQuery(1000)
    let { entries } = await this.tableUtil.queryAzTable(this.tables.customers, query, {
      columnMap: {
        RowKey: 'key'
      }
    })
    if (options.sortBy) entries = arraySort(entries, options.sortBy)
    return entries
  }

  /**
   * Create or update customer in table Customers
   *
   * @param {any} customer Customer
   * @param {string} createdBy Created by ID
   * @param {boolean} update Update the existing customer
   */
  async createOrUpdateCustomer(customer: any, createdBy: string, update: boolean) {
    const entity = this.tableUtil.convertToAzEntity(customer.key.toUpperCase(), {
      ...omit(customer, 'key'),
      createdBy
    })
    let result
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.customers, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.customers, entity)
    return result
  }

  /**
   * Delete customer from table storage
   *
   * @param {string} key Customer key
   */
  async deleteCustomer(key: string) {
    const { string } = this.tableUtil.azEntGen()
    try {
      const result = await this.tableUtil.deleteEntity(this.tables.customers, {
        PartitionKey: string('Default'),
        RowKey: string(key)
      })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Get projects from table storage
   *
   * @param {string} customerKey Customer key
   * @param {any} options Options
   */
  async getProjects(customerKey?: string, options: any = {}) {
    const q = this.tableUtil.query()
    const filter = [['PartitionKey', customerKey, q.string, q.equal]]
    const query = this.tableUtil.createAzQuery(1000, filter)
    let columnMap = {}
    if (!options.noParse) {
      columnMap = {
        RowKey: 'key',
        PartitionKey: 'customerKey'
      }
    }
    let { entries } = await this.tableUtil.queryAzTable(this.tables.projects, query, { columnMap })
    if (options.sortBy) entries = arraySort(entries, options.sortBy)
    return entries
  }

  /**
   * Create or update project in table storage
   *
   * @param {*} project Project data
   * @param {string} createdBy Created by ID
   * @param {boolean} update Update the existing project
   *
   * @returns The id of the crated project
   */
  async createOrUpdateProject(project: any, createdBy: string, update: boolean) {
    const id = [project.customerKey, project.key].join(' ')
    const entity = this.tableUtil.convertToAzEntity(
      project.key,
      {
        ...project,
        id,
        labels: !!project.labels ? project.labels.join('|') : '',
        createdBy
      },
      project.customerKey,
      { removeBlanks: false }
    )
    if (update) await this.tableUtil.updateAzEntity(this.tables.projects, entity, true)
    else await this.tableUtil.addAzEntity(this.tables.projects, entity)
    return id
  }

  /**
   * Get users from table storage
   */
  async getUsers(): Promise<any[]> {
    const query = this.tableUtil.createAzQuery(1000)
    const { entries } = await this.tableUtil.queryAzTable(this.tables.users, query, {
      columnMap: {
        RowKey: 'id'
      }
    })
    return arraySort(entries, 'displayName')
  }

  /**
   * Get user from table storage
   *
   * @param {string} userId The user ID
   */
  async getUser(userId: string): Promise<Express.User> {
    try {
      return await this.tableUtil.retrieveAzEntity<Express.User>(this.tables.users, userId, {
        columnMap: { RowKey: 'id' }
      })
    } catch (error) {
      return null
    }
  }

  /**
   * Add or update user in table storage
   *
   * @param {*} user The user data
   * @param {boolean} update Update the existing user
   */
  async addOrUpdateUser(user: any, update: boolean) {
    const entity = this.tableUtil.convertToAzEntity(user.id, omit(user, 'id'))
    let result
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.users, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.users, entity)
    return result
  }

  /**
   * Bulk imports users to table storage
   *
   * @param {any[]} users Users to import
   */
  async bulkImport(users: any[]) {
    const entities = users.map((user) => {
      const entity = this.tableUtil.convertToAzEntity(user.id, {
        ...omit(user, 'id'),
        role: 'User'
      })
      return entity
    })
    const batch = this.tableUtil.createAzBatch()
    entities.forEach((entity) => batch.insertEntity(entity, {}))
    await this.tableUtil.executeBatch(this.tables.users, batch)
  }

  /**
   * Get time entries from table storage
   *
   * @param {any} queryValues Query values
   * @param {any} options Options
   */
  async getTimeEntries(queryValues: any, options: any = {}) {
    const q = this.tableUtil.query()
    const filter = [
      ['PeriodId', queryValues.periodId, q.string, q.equal],
      ['ProjectId', queryValues.projectId, q.string, q.equal],
      ['PartitionKey', queryValues.resourceId, q.string, q.equal],
      ['WeekNumber', queryValues.weekNumber, q.int, q.equal],
      ['MonthNumber', queryValues.monthNumber, q.int, q.equal],
      ['MonthNumber', queryValues.startMonthIndex, q.int, q.greaterThanOrEqual],
      ['MonthNumber', queryValues.endMonthIndex, q.int, q.lessThanOrEqual],
      ['Year', queryValues.year, q.int, q.equal],
      ['StartDateTime', this.tableUtil.convertToAzDate(queryValues.startDateTime), q.date, q.greaterThan],
      ['EndDateTime', this.tableUtil.convertToAzDate(queryValues.endDateTime), q.date, q.lessThan]
    ]
    const query = this.tableUtil.createAzQuery(1000, filter)
    const tableName = options.forecast ? this.tables.forecastedTimeEntries : this.tables.timeEntries
    let result = await this.tableUtil.queryAzTableAll(tableName, query, {
      PartitionKey: 'resourceId',
      RowKey: 'id'
    })
    result = result.slice().sort(({ startDateTime: a }, { startDateTime: b }) => {
      return options.sortAsc
        ? new Date(a).getTime() - new Date(b).getTime()
        : new Date(b).getTime() - new Date(a).getTime()
    })
    return result
  }

  /**
   * Add time entries
   *
   * @param {string} resourceId ID of the resource
   * @param {string} periodId Period ID
   * @param {any[]} timeentries Collection of time entries
   * @param {boolean} forecast Forecast
   */
  async addTimeEntries(resourceId: string, periodId: string, timeentries: any[], forecast: boolean) {
    let totalDuration = 0
    const entities = timeentries.map(({ projectId, manualMatch, event, labels }) => {
      const [weekNumber, monthNumber, year] = periodId.split('_').map((p) => parseInt(p, 10))
      const duration = getDurationHours(event.startDateTime, event.endDateTime)
      totalDuration += duration
      const entity = this.tableUtil.convertToAzEntity(
        event.id,
        {
          ...pick(event, 'title', 'startDateTime', 'endDateTime', 'webLink'),
          projectId,
          manualMatch,
          description: event.body,
          duration,
          year,
          weekNumber,
          monthNumber,
          periodId: periodId,
          labels: labels.join('|')
        },
        resourceId,
        {
          removeBlanks: true,
          typeMap: {
            startDateTime: 'datetime',
            endDateTime: 'datetime'
          }
        }
      )
      return entity
    })
    const batch = this.tableUtil.createAzBatch()
    entities.forEach((entity) => batch.insertEntity(entity, {}))
    const tableName = forecast ? 'ForecastedTimeEntries' : this.tables.timeEntries
    await this.tableUtil.executeBatch(tableName, batch)
    return totalDuration
  }

  /**
   * Delete the user entries from table storage
   *
   * @param {string} periodId Period ID
   * @param {string} resourceId Resource ID
   * @param {boolean} forecast Forecast (using separate table if specified)
   */
  async deleteTimeEntries(periodId: string, resourceId: string, forecast: boolean) {
    const { string } = this.tableUtil.azEntGen()
    const timeEntries = await this.getTimeEntries({ resourceId, periodId }, { forecast })
    if (timeEntries.length === 0) return
    const batch = this.tableUtil.createAzBatch()
    timeEntries.forEach((entry) =>
      batch.deleteEntity({
        PartitionKey: string(resourceId),
        RowKey: string(entry.id)
      })
    )
    const tableName = forecast ? this.tables.forecastedTimeEntries : this.tables.timeEntries
    await this.tableUtil.executeBatch(tableName, batch)
  }

  /**
   * Get confirmed periods from table storage
   *
   * @param {any} filterValues Filtervalues
   */
  async getConfirmedPeriods(filterValues: any) {
    try {
      const q = this.tableUtil.query()
      const filter = [
        ['PartitionKey', filterValues.resourceId, q.string, q.equal],
        ['Year', filterValues.year, q.int, q.equal]
      ]
      const query = this.tableUtil.createAzQuery(1000, filter)
      const result = await this.tableUtil.queryAzTableAll(this.tables.confirmedPeriods, query, {
        PartitionKey: 'resourceId',
        RowKey: 'periodId'
      })
      return result
    } catch (error) {
      return null
    }
  }

  /**
   * Get forecasted periods from table storage
   *
   * @param {any} filterValues Filtervalues
   */
  async getForecastedPeriods(filterValues: any) {
    try {
      const q = this.tableUtil.query()
      const filter = [
        ['PartitionKey', filterValues.resourceId, q.string, q.equal],
        ['Year', filterValues.year, q.int, q.equal]
      ]
      const query = this.tableUtil.createAzQuery(1000, filter)
      const result = await this.tableUtil.queryAzTableAll(this.tables.forecastedPeriods, query, {
        PartitionKey: 'resourceId',
        RowKey: 'periodId'
      })
      return result
    } catch (error) {
      return null
    }
  }

  /**
   * Get entry for the period from table storage
   *
   * @param {string} resourceId ID of the resource
   * @param {string} periodId The period
   */
  async getConfirmedPeriod(resourceId: string, periodId: string) {
    try {
      return await this.tableUtil.retrieveAzEntity(this.tables.confirmedPeriods, periodId, {}, resourceId)
    } catch (error) {
      return null
    }
  }

  /**
   * Get entry for the period from table storage
   *
   * @param {string} resourceId ID of the resource
   * @param {string} periodId The period
   */
  async getForecastedPeriod(resourceId: string, periodId: string) {
    try {
      return await this.tableUtil.retrieveAzEntity(this.tables.forecastedPeriods, periodId, {}, resourceId)
    } catch (error) {
      return null
    }
  }

  /**
   * Add entry for the confirmed period to table storage
   *
   * @param {string} resourceId ID of the resource
   * @param {string} periodId Period ID
   * @param {number} hours Hours
   * @param {number} forecastedHours Forecasted hours
   */
  async addConfirmedPeriod(resourceId: string, periodId: string, hours: number, forecastedHours: number) {
    const [weekNumber, monthNumber, year] = periodId.split('_').map((p) => parseInt(p, 10))
    const entity = this.tableUtil.convertToAzEntity(
      periodId,
      {
        weekNumber,
        monthNumber,
        year,
        hours,
        forecastedHours
      },
      resourceId,
      {
        typeMap: {
          forecastedHours: 'double',
          hours: 'double'
        }
      }
    )
    await this.tableUtil.addAzEntity(this.tables.confirmedPeriods, entity)
  }

  /**
   * Add entry for the forecasted period to table storage
   *
   * @param {string} resourceId ID of the resource
   * @param {string} periodId Period ID
   * @param {number} hours Hours
   */
  async addForecastedPeriod(resourceId: string, periodId: string, hours: number) {
    const [weekNumber, monthNumber, year] = periodId.split('_').map((p) => parseInt(p, 10))
    const entity = this.tableUtil.convertToAzEntity(
      periodId,
      {
        weekNumber,
        monthNumber,
        year,
        hours
      },
      resourceId,
      {
        typeMap: {
          hours: 'double'
        }
      }
    )

    await this.tableUtil.addAzEntity(this.tables.forecastedPeriods, entity)
  }

  /**
   * Removed the entry for the period in table storage
   *
   * @param {string} periodId The period ID
   * @param {string} resourceId ID of the resource
   */
  async removeConfirmedPeriod(periodId: string, resourceId: string) {
    const { string } = this.tableUtil.azEntGen()
    try {
      const result = await this.tableUtil.deleteEntity(this.tables.confirmedPeriods, {
        PartitionKey: string(resourceId),
        RowKey: string(periodId)
      })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Removed the entry for the period in table storage
   *
   * @param {string} periodId The period ID
   * @param {string} resourceId ID of the resource
   */
  async removeForecastedPeriod(periodId: string, resourceId: string) {
    const { string } = this.tableUtil.azEntGen()
    try {
      const result = await this.tableUtil.deleteEntity(this.tables.forecastedPeriods, {
        PartitionKey: string(resourceId),
        RowKey: string(periodId)
      })
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Get roles from table storage
   */
  async getRoles() {
    try {
      const query = this.tableUtil.createAzQuery(1000)
      const { entries } = await this.tableUtil.queryAzTable<Role>(this.tables.roles, query, {
        columnMap: {
          RowKey: 'name'
        },
        typeMap: {
          Permissions: 'Custom.ArrayPipe'
        }
      })
      return entries
    } catch (error) {
      return []
    }
  }

  /**
   * Get role by name from table storage
   *
   * @param {string} name The role name
   */
  async getRoleByName(name: string) {
    try {
      return await this.tableUtil.retrieveAzEntity<Role>(this.tables.roles, name, {
        columnMap: { RowKey: 'name' },
        typeMap: { Permissions: 'Custom.ArrayPipe' }
      })
    } catch (error) {
      return []
    }
  }

  /**
   * Add role to table storage
   *
   * @param {any} role The role data
   * @param {boolean} update Update the existing role
   */
  async addOrUpdateRole(role: any, update: boolean) {
    const entity = this.tableUtil.convertToAzEntity(
      role.name,
      {
        permissions: role.permissions.join('|'),
        icon: role.icon
      },
      'Default',
      {
        typeMap: {}
      }
    )
    let result
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.roles, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.roles, entity)
    return result
  }
}

export default AzStorageService
