// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('debug')('services/storage')
import AzTableUtilities from '../utils/table'
import { getDurationHours, toArray } from '../utils'
import arraySort from 'array-sort'
import { omit, pick } from 'underscore'
import { createTableService } from 'azure-storage'

class AzStorageService {
  public tableUtil: AzTableUtilities
  public tables: {
    timeEntries: string;
    forecastedTimeEntries: string;
    confirmedPeriods: string;
    forecastedPeriods: string;
    projects: string;
    customers: string;
    roles: string;
    labels: string;
    users: string
  }

  /**
   * Constructor
   * 
   * @param {any} subscription 
   */
  constructor(subscription: any) {
    this.tableUtil = new AzTableUtilities(createTableService(subscription.connectionString))
    this.tables = {
      timeEntries: 'TimeEntries',
      forecastedTimeEntries: 'ForecastedTimeEntries',
      confirmedPeriods: 'ConfirmedPeriods',
      forecastedPeriods: 'ForecastedPeriods',
      projects: 'Projects',
      customers: 'Customers',
      roles: 'Roles',
      labels: 'Labels',
      users: 'Users',
    }
  }

  /**
   * Get labels from table Labels
   */
  async getLabels() {
    const query = this.tableUtil.createAzQuery(1000)
    const { entries } = await this.tableUtil.queryAzTable(this.tables.labels, query, { RowKey: 'name' })
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
      createdBy,
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
        RowKey: string(name),
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
      RowKey: 'key',
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
      createdBy,
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
        RowKey: string(key),
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
        PartitionKey: 'customerKey',
      }
    }
    let { entries } = await this.tableUtil.queryAzTable(this.tables.projects, query, columnMap)
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
        createdBy,
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
      RowKey: 'id',
    })
    return arraySort(entries, 'displayName')
  }

  /**
   * Get user from table storage
   *
   * @param {string} userId The user ID
   */
  async getUser(userId: string) {
    try {
      const entry = await this.tableUtil.retrieveAzEntity(this.tables.users, 'Default', userId)
      return this.tableUtil.parseAzEntity(entry, { RowKey: 'id' })
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
   * Bulk add users to table storage
   *
   * @param {any[]} users Users to add
   */
  async bulkAddUsers(users: any[]) {
    const entities = users.map(user => {
      const entity = this.tableUtil.convertToAzEntity(user.id, {
        ...omit(user, 'id'),
        role: 'User',
      })
      return entity
    })
    const batch = this.tableUtil.createAzBatch()
    entities.forEach(entity => batch.insertEntity(entity, {}))
    await this.tableUtil.executeBatch(this.tables.users, batch)
  }

  /**
   * Get time entries from table storage
   *
   * @param {any} filterValues Filtervalues
   * @param {any} options Options: sortAsc, forecast
   */
  async getTimeEntries(filterValues: any, options: any = {}) {
    const q = this.tableUtil.query()
    const filter = [
      ['PeriodId', filterValues.periodId, q.string, q.equal],
      ['ProjectId', filterValues.projectId, q.string, q.equal],
      ['PartitionKey', filterValues.resourceId, q.string, q.equal],
      ['WeekNumber', filterValues.weekNumber, q.int, q.equal],
      ['MonthNumber', filterValues.monthNumber, q.int, q.equal],
      ['MonthNumber', filterValues.startMonthIndex, q.int, q.greaterThanOrEqual],
      ['MonthNumber', filterValues.endMonthIndex, q.int, q.lessThanOrEqual],
      ['Year', filterValues.year, q.int, q.equal],
      ['StartDateTime', this.tableUtil.convertDate(filterValues.startDateTime), q.date, q.greaterThan],
      ['EndDateTime', this.tableUtil.convertDate(filterValues.endDateTime), q.date, q.lessThan],
    ]
    const query = this.tableUtil.createAzQuery(1000, filter)
    const tableName = options.forecast ? this.tables.forecastedTimeEntries : this.tables.timeEntries
    let result = await this.tableUtil.queryAzTableAll(tableName, query, {
      PartitionKey: 'resourceId',
      RowKey: 'id',
    })
    log('Queried %d time entries from %s', result.length, tableName)
    result = result.slice().sort(({ startDateTime: a }, { startDateTime: b }) => {
      return options.sortAsc ? new Date(a).getTime() - new Date(b).getTime() : new Date(b).getTime() - new Date(a).getTime()
    })
    return result
  }

  /**
   * Add time entries
   *
   * @param {{ id: string }} period Period
   * @param {{ id: string }} user User
   * @param {any[]} timeentries Collection of time entries
   * @param {boolean} forecast Forecast
   */
  async addTimeEntries(period: { id: string }, user: { id: string }, timeentries: any[], forecast: boolean) {
    let totalDuration = 0
    const entities = timeentries.map(({ projectId, manualMatch, event, labels }) => {
      const [weekNumber, monthNumber, year] = period.id.split('_').map(p => parseInt(p, 10))
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
          periodId: period.id,
          labels: labels.join('|'),
        },
        user.id,
        {
          removeBlanks: true,
          typeMap: {
            startDateTime: 'datetime',
            endDateTime: 'datetime',
          },
        }
      )
      return entity
    })
    const batch = this.tableUtil.createAzBatch()
    entities.forEach(entity => batch.insertEntity(entity, {}))
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
    timeEntries.forEach(entry =>
      batch.deleteEntity({
        PartitionKey: string(resourceId),
        RowKey: string(entry.id),
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
        ['Year', filterValues.year, q.int, q.equal],
      ]
      const query = this.tableUtil.createAzQuery(1000, filter)
      const result = await this.tableUtil.queryAzTableAll(this.tables.confirmedPeriods, query, {
        PartitionKey: 'resourceId',
        RowKey: 'periodId',
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
        ['Year', filterValues.year, q.int, q.equal],
      ]
      const query = this.tableUtil.createAzQuery(1000, filter)
      const result = await this.tableUtil.queryAzTableAll(this.tables.forecastedPeriods, query, {
        PartitionKey: 'resourceId',
        RowKey: 'periodId',
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
      const entry = await this.tableUtil.retrieveAzEntity(this.tables.confirmedPeriods, resourceId, periodId)
      return this.tableUtil.parseAzEntity(entry)
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
      const entry = await this.tableUtil.retrieveAzEntity(this.tables.forecastedPeriods, resourceId, periodId)
      return this.tableUtil.parseAzEntity(entry)
    } catch (error) {
      return null
    }
  }

  /**
   * Add entry for the confirmed period to table storage
   *
   * @param {{id: string, hours: number, forecastedHours: number}} period Period
   * @param {string} resourceId ID of the resource
   *
   * @returns void
   */
  async addConfirmedPeriod(period: { id: string, hours: number, forecastedHours: number }, resourceId: string) {
    const [weekNumber, monthNumber, year] = period.id.split('_').map(p => parseInt(p, 10))
    const entity = this.tableUtil.convertToAzEntity(
      period.id,
      {
        weekNumber,
        monthNumber,
        year,
        hours: period.hours,
        forecastedHours: period.forecastedHours,
      },
      resourceId,
      {
        typeMap: {
          forecastedHours: 'double',
          hours: 'double',
        },
      }
    )
    await this.tableUtil.addAzEntity(this.tables.confirmedPeriods, entity)
  }

  /**
   * Add entry for the forecasted period to table storage
   *
   * @param {{id: string, hours: number}} period Period
   * @param {string} resourceId ID of the resource
   */
  async addForecastedPeriod(period:  {id: string, hours: number}, resourceId: string) {
    const [weekNumber, monthNumber, year] = period.id.split('_').map(p => parseInt(p, 10))
    const entity = this.tableUtil.convertToAzEntity(
      period.id,
      {
        weekNumber,
        monthNumber,
        year,
        hours: period.hours,
      },
      resourceId,
      {
        typeMap: {
          hours: 'double',
        },
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
        RowKey: string(periodId),
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
        RowKey: string(periodId),
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
      let { entries } = await this.tableUtil.queryAzTable(this.tables.roles, query, {
        RowKey: 'name',
      })
      entries = entries.map(entry => ({
        ...entry,
        permissions: toArray(entry.permissions, '|'),
      }))
      return entries
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
    const entity = this.tableUtil.convertToAzEntity(role.name, {
      permissions: role.permissions.join('|'),
      icon: role.icon,
    })
    let result
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.roles, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.roles, entity)
    return result
  }
}

export default AzStorageService
