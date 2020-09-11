const AzTableUtilities = require('../utils/table')
const { getDurationHours, getWeek, getMonthIndex, getYear, toArray } = require('../utils')
const arraySort = require('array-sort')
const { omit, pick } = require('underscore')
const { isBlank } = require('underscore.string')
const { createTableService } = require('azure-storage')
const uuidv4 = require('uuid').v4

class StorageService {
    constructor(subscription) {
        this.tableUtil = new AzTableUtilities(createTableService(subscription.connectionString))
    }

    /**
     * Get labels from table Labels
     */
    async getLabels() {
        const query = this.tableUtil.createAzQuery(1000, undefined)
        const { entries } = await this.tableUtil.queryAzTable('Labels', query, {
            RowKey: 'name'
        })
        return entries
    }

    /**
     * Create label in table Labels
     * 
     * @param label Label data
     * @param createdBy Created by ID
     * @param update Update the existing label
     */
    async addOrUpdateLabel(label, createdBy, update) {
        const { string } = this.tableUtil.azEntGen()
        const entity = this.tableUtil.convertToAzEntity(
            label.name,
            {
                ...omit(label, 'name'),
                createdBy,
            },
        )
        if (update) result = await this.tableUtil.updateEntity('Labels', entity, true)
        else result = await this.tableUtil.addAzEntity('Labels', entity)
        return result
    }

    /**
    * Delete label from table Labels
    * 
    * @param name Label name
    */
    async deleteLabel(name) {
        const { string } = this.tableUtil.azEntGen()
        try {
            const result = await this.tableUtil.deleteEntity(
                'Labels',
                {
                    PartitionKey: string('Default'),
                    RowKey: string(name),
                }
            )
            return result
        }
        catch (error) {
            throw error
        }
    }

    /**
     * Get customers from table Customers
     * 
     * @param options Options
     */
    async getCustomers(options = {}) {
        const query = this.tableUtil.createAzQuery(1000)
        let { entries } = await this.tableUtil.queryAzTable('Customers', query, { RowKey: 'key' })
        if (options.sortBy) entries = arraySort(entries, options.sortBy)
        return entries
    }



    /**
     * Create or update customer in table Customers
     * 
     * @param customer Customer
     * @param createdBy Created by ID
     * @param update Update the existing customer
     */
    async createOrUpdateCustomer(customer, createdBy, update) {
        const { string } = this.tableUtil.azEntGen()
        const entity = this.tableUtil.convertToAzEntity(
            customer.key.toUpperCase(),
            {
                ...omit(customer, 'key'),
                createdBy,
            }
        )
        let result
        if (update) result = await this.tableUtil.updateEntity('Customers', entity, true)
        else result = await this.tableUtil.addAzEntity('Customers', entity)
        return result
    }

    /**
     * Delete customer from table Custoemrs
     * 
     * @param key Customer key
     */
    async deleteCustomer(key) {
        const { string } = this.tableUtil.azEntGen()
        try {
            const result = await this.tableUtil.deleteEntity(
                'Customers',
                {
                    PartitionKey: string('Default'),
                    RowKey: string(key),
                }
            )
            return result
        }
        catch (error) {
            throw error
        }
    }

    /**
     * Get projects from table Project
     * 
     * @param customerKey Customer key
     * @param options Options
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
                PartitionKey: 'customerKey'
            }
        }
        let { entries } = await this.tableUtil.queryAzTable(
            'Projects',
            query,
            columnMap
        )
        if (options.sortBy) entries = arraySort(entries, options.sortBy)
        return entries
    }

    /**
     * Create or update project in table Projects
     * 
     * @param project Project data
     * @param createdBy Created by ID
     * @param update Update the existing project
     */
    async createOrUpdateProject(project, createdBy, update) {
        const id = [project.customerKey, project.key].join(' ')
        const entity = this.tableUtil.convertToAzEntity(
            project.key,
            {
                ...project,
                id,
                labels: project.labels && project.labels.join('|'),
                createdBy,
            },
            project.customerKey
        )
        let result
        if (update) result = await this.tableUtil.updateEntity('Projects', entity, true)
        else result = await this.tableUtil.addAzEntity('Projects', entity)
        return result
    }

    /**
     * Get users from table Users
     */
    async getUsers() {
        const query = this.tableUtil.createAzQuery(1000, undefined)
        const { entries } = await this.tableUtil.queryAzTable('Users', query, { RowKey: 'id' })
        return entries
    }

    /**
     * Get user from table Users
     * 
     * @param userId The user ID
     */
    async getUser(userId) {
        try {
            const entry = await this.tableUtil.retrieveAzEntity(
                'Users',
                'Default',
                userId
            )
            return this.tableUtil.parseAzEntity(entry, { RowKey: 'id' })
        } catch (error) {
            return null
        }
    }

    /**
     * Add or update user in table Users
     * 
     * @param user The user data
     * @param update Update the existing user
     */
    async addOrUpdateUser(user, update) {
        const { string } = this.tableUtil.azEntGen()
        const entity = this.tableUtil.convertToAzEntity(
            user.id,
            omit(user, 'id'),
        )
        let result
        if (update) result = await this.tableUtil.updateEntity('Users', entity, true)
        else result = await this.tableUtil.addAzEntity('Users', entity)
        return result
    }

    /**
     * Get entries from table TimeEntries
     * 
     * @param filterValues Filtervalues
     * @param options Options
     */
    async getTimeEntries(filterValues, options = {}) {
        const q = this.tableUtil.query()
        const filter = [
            ['PeriodId', filterValues.periodId, q.string, q.equal],
            ['ProjectId', filterValues.projectId, q.string, q.equal],
            ['PartitionKey', filterValues.resourceId, q.string, q.equal],
            ['WeekNumber', filterValues.weekNumber, q.int, q.equal],
            ['WeekNumber', filterValues.minWeekNumber, q.int, q.greaterThanOrEqual],
            ['WeekNumber', filterValues.maxWeekNumber, q.int, q.lessThanOrEqual],
            ['MonthNumber', filterValues.monthNumber, q.int, q.equal],
            ['MonthNumber', filterValues.minMonthNumber, q.int, q.greaterThanOrEqual],
            ['MonthNumber', filterValues.maxMonthNumber, q.int, q.lessThanOrEqual],            
            ['Year', filterValues.year, q.int, q.equal],
            ['StartDateTime', this.tableUtil.convertDate(filterValues.startDateTime), q.date, q.greaterThan],
            ['EndDateTime', this.tableUtil.convertDate(filterValues.endDateTime), q.date, q.lessThan],
        ]
        const query = this.tableUtil.createAzQuery(1000, undefined, filter)
        let result = await this.tableUtil.queryAzTableAll(
            'TimeEntries',
            query,
            {
                PartitionKey: 'resourceId',
                RowKey: 'id'
            }
        )
        result = result.slice().sort(({ startDateTime: a }, { startDateTime: b }) => {
            return options.sortAsc
                ? new Date(a) - new Date(b)
                : new Date(b) - new Date(a)
        })
        return result
    }

    /**
     * Delete entries to table TimeEntries
     * 
     * @param periodId Period ID
     * @param timeentries Collection of time entries
     */
    async addTimeEntries(periodId, timeentries) {
        let totalDuration = 0
        const { string, datetime, double, int, boolean } = this.tableUtil.azEntGen()
        const entities = timeentries.map(({ entry, event, user, labels }) => {
            const weekNumber = getWeek(event.startDateTime)
            const monthNumber = getMonthIndex(event.startDateTime)
            const year = getYear(event.startDateTime)
            const duration = getDurationHours(event.startDateTime, event.endDateTime)
            totalDuration += duration
            const entity = this.tableUtil.convertToAzEntity(
                entry.id,
                {
                    ...pick(entry, 'projectId', 'manualMatch'),
                    ...pick(event, 'title', 'startDateTime', 'endDateTime', 'webLink'),
                    description: event.body,
                    resourceName: user.profile.displayName,
                    duration,
                    year,
                    weekNumber,
                    monthNumber,
                    periodId,
                    labels: labels.join('|'),
                },
                user.id,
                ['startDateTime', 'endDateTime']
            )
            return entity
        })
        const batch = this.tableUtil.createAzBatch()
        entities.forEach(entity => batch.insertEntity(entity))
        await this.tableUtil.executeBatch('TimeEntries', batch)
        return totalDuration
    }

    /**
     * Delete the user entries from table TimeEntries
     * 
     * @param periodId Period ID
     * @param resourceId ID of the resource
     */
    async deleteUserTimeEntries(periodId, resourceId) {
        const { string } = this.tableUtil.azEntGen()
        const timeEntries = await this.getTimeEntries({ resourceId, periodId })
        const batch = this.tableUtil.createAzBatch()
        timeEntries.forEach(e => batch.deleteEntity({
            PartitionKey: string(resourceId),
            RowKey: string(e.id)
        }))
        await this.tableUtil.executeBatch('TimeEntries', batch)
    }

    /**
     * Get entries from table ConfirmedPeriods
     */
    async getConfirmedPeriods({ resourceId, year }) {
        try {
            const q = this.tableUtil.query()
            const filter = [
                ['PartitionKey', resourceId, q.string, q.equal],
                ['Year', year, q.int, q.equal],
            ]
            const query = this.tableUtil.createAzQuery(1000, undefined, filter)
            let result = await this.tableUtil.queryAzTableAll(
                'ConfirmedPeriods',
                query,
                {
                    PartitionKey: 'resourceId',
                    RowKey: 'periodId'
                }
            )
            return result
        } catch (error) {
            return null
        }
    }

    /**
     * Get entry for the period from table ConfirmedPeriods
     * 
     * @param resourceId ID of the resource
     * @param periodId The period
     */
    async getConfirmedPeriod(resourceId, periodId) {
        try {
            const entry = await this.tableUtil.retrieveAzEntity(
                'ConfirmedPeriods',
                resourceId,
                periodId
            )
            return this.tableUtil.parseAzEntity(entry)
        } catch (error) {
            return null
        }
    }

    /**
     * Add entry for the period to table ConfirmedPeriods
     * 
     * @param periodId The period ID
     * @param resourceId ID of the resource
     * @param hours Total hours for the train
     */
    async addConfirmedPeriod(periodId, resourceId, hours) {
        const [week, month, year] = periodId.split('_')
        const { string, double, int } = this.tableUtil.azEntGen()
        const entity = await this.tableUtil.addAzEntity(
            'ConfirmedPeriods',
            {
                PartitionKey: string(resourceId),
                RowKey: string(periodId),
                WeekNumber: int(week),
                MonthNumber: int(month),
                Year: int(year),
                Hours: double(hours),
            }
        )
        return entity
    }

    /**
     * Removed the entry for the period in table ConfirmedPeriods
     * 
     * @param periodId The period ID
     * @param resourceId ID of the resource
     */
    async removeConfirmedPeriod(periodId, resourceId) {
        const { string } = this.tableUtil.azEntGen()
        try {
            const result = await this.tableUtil.deleteEntity(
                'ConfirmedPeriods',
                {
                    PartitionKey: string(resourceId),
                    RowKey: string(periodId),
                }
            )
            return result
        }
        catch (error) {
            throw error
        }
    }

    /**
     * Get roles
     */
    async getRoles() {
        try {
            const query = this.tableUtil.createAzQuery(1000, undefined)
            let { entries } = await this.tableUtil.queryAzTable('Roles', query, { RowKey: 'name' })
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
     * Add role to table Roles
     * 
     * @param role The role data
     * @param update Update the existing role
     */
    async addOrUpdateRole(role, update) {
        const { string } = this.tableUtil.azEntGen()
        const entity = this.tableUtil.convertToAzEntity(
            role.name,
            {
                permissions: role.permissions.join('|')
            },
        )
        let result
        if (update) result = await this.tableUtil.updateEntity('Roles', entity, true)
        else result = await this.tableUtil.addAzEntity('Roles', entity)
        return result
    }
}

module.exports = StorageService