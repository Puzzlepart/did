const AzTableUtilities = require('../utils/table')
const { getDurationHours, getWeek, getMonthIndex, getYear, toArray } = require('../utils')
const arraySort = require('array-sort')
const { omit, pick, isEqual } = require('underscore')
const { isBlank } = require('underscore.string')
const { createTableService } = require('azure-storage')
const log = require('debug')('services/storage')

class AzStorageService {
  constructor(subscription) {
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
      users: 'Users'
    }
  }

  /**
   * Get labels from table Labels
   */
  async getLabels() {
    const query = this.tableUtil.createAzQuery(1000, undefined)
    const { entries } = await this.tableUtil.queryAzTable(this.tables.labels, query, { RowKey: 'name' })
    return entries
  }

  /**
   * Create label in table Labels
   *
   * @param {*} label Label data
   * @param {*} createdBy Created by ID
   * @param {*} update Update the existing label
   */
  async addOrUpdateLabel(label, createdBy, update) {
    const { string } = this.tableUtil.azEntGen()
    const entity = this.tableUtil.convertToAzEntity(label.name, {
      ...omit(label, 'name'),
      createdBy,
    })
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.labels, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.labels, entity)
    return result
  }

  /**
   * Delete label from table Labels
   *
   * @param {*} name Label name
   */
  async deleteLabel(name) {
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
   * @param {*} options Options
   */
  async getCustomers(options = {}) {
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
   * @param {*} customer Customer
   * @param {*} createdBy Created by ID
   * @param {*} update Update the existing customer
   */
  async createOrUpdateCustomer(customer, createdBy, update) {
    const { string } = this.tableUtil.azEntGen()
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
   * @param {*} key Customer key
   */
  async deleteCustomer(key) {
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
   * @param {*} customerKey Customer key
   * @param {*} options Options
   */
  async getProjects(customerKey, options = {}) {
    const q = this.tableUtil.query()
    const filter = [['PartitionKey', customerKey, q.string, q.equal]]
    const query = this.tableUtil.createAzQuery(1000, undefined, filter)
    const parse = !options.noParse
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
   * @param {*} createdBy Created by ID
   * @param {*} update Update the existing project
   *
   * @returns The id of the crated project
   */
  async createOrUpdateProject(project, createdBy, update) {
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
    let result
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.projects, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.projects, entity)
    return id
  }

  /**
   * Get users from table storage
   */
  async getUsers() {
    const query = this.tableUtil.createAzQuery(1000, undefined)
    const { entries } = await this.tableUtil.queryAzTable(this.tables.users, query, {
      RowKey: 'id',
    })
    return arraySort(entries, 'displayName')
  }

  /**
   * Get user from table storage
   *
   * @param {*} userId The user ID
   */
  async getUser(userId) {
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
   * @param {*} update Update the existing user
   */
  async addOrUpdateUser(user, update) {
    const { string } = this.tableUtil.azEntGen()
    const entity = this.tableUtil.convertToAzEntity(user.id, omit(user, 'id'))
    let result
    if (update) result = await this.tableUtil.updateAzEntity(this.tables.users, entity, true)
    else result = await this.tableUtil.addAzEntity(this.tables.users, entity)
    return result
  }

  /**
   * Bulk add users to table storage
   *
   * @param {*} users Users to add
   */
  async bulkAddUsers(users) {
    const entities = users.map(user => {
      const entity = this.tableUtil.convertToAzEntity(user.id, {
        ...omit(user, 'id'),
        role: 'User',
      })
      return entity
    })
    const batch = this.tableUtil.createAzBatch()
    entities.forEach(entity => batch.insertEntity(entity))
    await this.tableUtil.executeBatch(this.tables.users, batch)
  }

  /**
   * Get time entries from table storage
   *
   * @param {*} filterValues Filtervalues
   * @param {*} options Options: sortAsc, forecast
   */
  async getTimeEntries(filterValues, options = {}) {
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
    const query = this.tableUtil.createAzQuery(1000, undefined, filter)
    const tableName = options.forecast ? this.tables.forecastedTimeEntries : this.tables.timeEntries
    let result = await this.tableUtil.queryAzTableAll(tableName, query, {
      PartitionKey: 'resourceId',
      RowKey: 'id',
    })
    log('Queried %d time entries from %s', result.length, tableName)
    result = result.slice().sort(({ startDateTime: a }, { startDateTime: b }) => {
      return options.sortAsc ? new Date(a) - new Date(b) : new Date(b) - new Date(a)
    })
    return result
  }

  /**
   * Add time entries
   *
   * @param {*} period Period: id
   * @param {*} user User: id
   * @param {*} timeentries Collection of time entries
   * @param {*} forecast Forecast
   */
  async addTimeEntries(period, user, timeentries, forecast) {
    let totalDuration = 0
    const entities = timeentries.map(({ projectId, manualMatch, event, labels }) => {
      const [
        weekNumber,
        monthNumber,
        year
      ] = period.id.split('_').map(p => parseInt(p, 10))
      const duration = getDurationHours(event.startDateTime, event.endDateTime)
      totalDuration += duration
      const entity = this.tableUtil.convertToAzEntity(
        event.id,
        {
          ...pick(
            event,
            'title',
            'startDateTime',
            'endDateTime',
            'webLink'
          ),
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
            endDateTime: 'datetime'
          },
        }
      )
      return entity
    })
    const batch = this.tableUtil.createAzBatch()
    entities.forEach(entity => batch.insertEntity(entity))
    const tableName = forecast ? 'ForecastedTimeEntries' : this.tables.timeEntries
    await this.tableUtil.executeBatch(tableName, batch)
    return totalDuration
  }

  /**
   * Delete the user entries from table storage
   *
   * @param {*} periodId Period ID
   * @param {*} resourceId Resource ID
   * @param {*} forecast Forecast (using separate table if specified)
   */
  async deleteTimeEntries(periodId, resourceId, forecast) {
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
   * @param {*} filterValues Filtervalues
   */
  async getConfirmedPeriods(filterValues) {
    try {
      const q = this.tableUtil.query()
      const filter = [
        ['PartitionKey', filterValues.resourceId, q.string, q.equal],
        ['Year', filterValues.year, q.int, q.equal],
      ]
      const query = this.tableUtil.createAzQuery(1000, undefined, filter)
      let result = await this.tableUtil.queryAzTableAll(this.tables.confirmedPeriods, query, {
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
   * @param {*} filterValues Filtervalues
   */
  async getForecastedPeriods(filterValues) {
    try {
      const q = this.tableUtil.query()
      const filter = [
        ['PartitionKey', filterValues.resourceId, q.string, q.equal],
        ['Year', filterValues.year, q.int, q.equal],
      ]
      const query = this.tableUtil.createAzQuery(1000, undefined, filter)
      let result = await this.tableUtil.queryAzTableAll(this.tables.forecastedPeriods, query, {
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
   * @param {*} resourceId ID of the resource
   * @param {*} periodId The period
   */
  async getConfirmedPeriod(resourceId, periodId) {
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
   * @param {*} resourceId ID of the resource
   * @param {*} periodId The period
   */
  async getForecastedPeriod(resourceId, periodId) {
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
   * @param {*} period Period: id, hours, forecastedHours
   * @param {*} resourceId ID of the resource
   * 
   * @returns void
   */
  async addConfirmedPeriod(period, resourceId) {
    const [
      weekNumber,
      monthNumber,
      year
    ] = period.id.split('_').map(p => parseInt(p, 10))
    const entity = this.tableUtil.convertToAzEntity(
      period.id,
      {
        weekNumber,
        monthNumber,
        year,
        hours: period.hours,
        forecastedHours: period.forecastedHours
      },
      resourceId,
      {
        typeMap: {
          forecastedHours: 'double',
          hours: 'double'
        }
      })
    await this.tableUtil.addAzEntity(this.tables.confirmedPeriods, entity)
  }

  /**
   * Add entry for the forecasted period to table storage
   *
   * @param {*} period Period: id, hours
   * @param {*} resourceId ID of the resource
   * 
   * @returns void
   */
  async addForecastedPeriod(period, resourceId) {
    const [
      weekNumber,
      monthNumber,
      year
    ] = period.id.split('_').map(p => parseInt(p, 10))
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
          hours: 'double'
        }
      })

    await this.tableUtil.addAzEntity(this.tables.forecastedPeriods, entity)
  }

  /**
   * Removed the entry for the period in table storage
   *
   * @param {*} periodId The period ID
   * @param {*} resourceId ID of the resource
   */
  async removeConfirmedPeriod(periodId, resourceId) {
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
   * @param {*} periodId The period ID
   * @param {*} resourceId ID of the resource
   */
  async removeForecastedPeriod(periodId, resourceId) {
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
      const query = this.tableUtil.createAzQuery(1000, undefined)
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
   * @param {*} role The role data
   * @param {*} update Update the existing role
   */
  async addOrUpdateRole(role, update) {
    const { string } = this.tableUtil.azEntGen()
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

module.exports = AzStorageService
