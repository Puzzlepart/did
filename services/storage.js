const TableUtil = require('../utils/table')
const { getDurationHours, getWeek, getMonthIndex, getYear, toArray } = require('../utils')
const arraySort = require('array-sort')
const { omit, pick } = require('underscore')
const { isBlank } = require('underscore.string')
const { createTableService } = require('azure-storage')
const uuidv4 = require('uuid').v4

class StorageService {
    constructor(subscription) {
        this.tableUtil = new TableUtil(createTableService(subscription.connectionString))
    }

    /**
     * Get labels from table Labels
     */
    async getLabels() {
        const query = this.tableUtil.createQuery(1000, undefined)
        const { entries } = await this.tableUtil.queryTable('Labels', query, {
            RowKey: 'id'
        })
        return entries
    }

    /**
     * Create label in table Labels
     * 
     * @param label Label data
     * @param createdBy Created by ID
     */
    async addOrUpdateLabel(label, createdBy) {
        const { string } = this.tableUtil.entGen()
        const entity = await this.tableUtil.updateEntity(
            'Labels',
            this.tableUtil.makeEntity(
                label.id || uuidv4(),
                {
                    ...omit(label, 'id'),
                    createdBy,
                }
            ),
            true
        )
        return entity
    }

    /**
    * Delete label from table Labels
    * 
    * @param id Label ID
    */
    async deleteLabel(id) {
        const { string } = this.tableUtil.entGen()
        try {
            const result = await this.tableUtil.deleteEntity(
                'Labels',
                {
                    PartitionKey: string('Default'),
                    RowKey: string(id),
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
        const query = this.tableUtil.createQuery(1000)
        let { entries } = await this.tableUtil.queryTable('Customers', query, { RowKey: 'key' })
        if (options.sortBy) entries = arraySort(entries, options.sortBy)
        return entries
    }

    /**
     * Create or update customer in table Customers
     * 
     * @param customer Customer
     * @param createdBy Created by ID
     */
    async createOrUpdateCustomer(customer, createdBy) {
        const { string } = this.tableUtil.entGen()
        const entity = await this.tableUtil.updateEntity(
            'Customers',
            this.tableUtil.makeEntity(
                customer.key.toUpperCase(),
                omit(customer, 'key'),
            ),
            true
        )
        return entity
    }

    /**
     * Delete customer from table Custoemrs
     * 
     * @param key Customer key
     */
    async deleteCustomer(key) {
        const { string } = this.tableUtil.entGen()
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
        const query = this.tableUtil.createQuery(1000, undefined, filter)
        const parse = !options.noParse
        let { entries } = await this.tableUtil.queryTable(
            'Projects',
            query,
            parse && {
                RowKey: 'key',
                PartitionKey: 'customerKey'
            }
        )
        if (options.sortBy) entries = arraySort(entries, options.sortBy)
        return entries
    }

    /**
     * Create or update project in table Projects
     * 
     * @param project Project data
     * @param createdBy Created by ID
     */
    async createOrUpdateProject(project, createdBy) {
        const { string } = this.tableUtil.entGen()
        const id = [project.customerKey, project.key].join(' ')
        const entity = await this.tableUtil.updateEntity(
            'Projects',
            this.tableUtil.makeEntity(
                project.customerKey,
                {
                    ...project,
                    id,
                    labels: project.labels && project.labels.join('|'),
                    createdBy,
                },
                project.customerKey
            ),
            true
        )
        return entity
    }

    /**
     * Get users from table Users
     */
    async getUsers() {
        const query = this.tableUtil.createQuery(1000, undefined)
        const { entries } = await this.tableUtil.queryTable('Users', query, { RowKey: 'id' })
        return entries
    }

    /**
     * Get user from table Users
     * 
     * @param userId The user ID
     */
    async getUser(userId) {
        try {
            const entry = await this.tableUtil.retrieveEntity(
                'Users',
                'Default',
                userId
            )
            return this.tableUtil.parseEntity(entry, { RowKey: 'id' })
        } catch (error) {
            return null
        }
    }

    /**
     * Add or update user in table Users
     * 
     * @param user The user data
     */
    async addOrUpdateUser(user) {
        const { string } = this.tableUtil.entGen()
        const entity = await this.tableUtil.updateEntity(
            'Users',
            this.tableUtil.makeEntity(
                user.id,
                omit(user, 'id'),
            ),
            true
        )
        return entity
    }

    /**
     * Get entries from table TimeEntries
     * 
     * @param filterValues Filtervalues
     * @param options Options
     */
    async getTimeEntries({ periodId, projectId, resourceId, weekNumber, year, startDateTime, endDateTime }, options = {}) {
        const q = this.tableUtil.query()
        const filter = [
            ['PeriodId', periodId, q.string, q.equal],
            ['ProjectId', projectId, q.string, q.equal],
            ['PartitionKey', resourceId, q.string, q.equal],
            ['WeekNumber', weekNumber, q.int, q.equal],
            ['Year', year, q.int, q.equal],
            ['StartDateTime', this.tableUtil.convertDate(startDateTime), q.date, q.greaterThan],
            ['EndDateTime', this.tableUtil.convertDate(endDateTime), q.date, q.lessThan],
        ]
        const query = this.tableUtil.createQuery(1000, undefined, filter)
        let result = await this.tableUtil.queryTableAll(
            'TimeEntries',
            query,
            !options.noParse && {
                PartitionKey: 'resourceId',
                RowKey: 'id'
            }
        )
        result = result.sort(({ startDateTime: a }, { startDateTime: b }) => {
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
        const { string, datetime, double, int, boolean } = this.tableUtil.entGen()
        const entities = timeentries.map(({ entry, event, user, labels }) => {
            const weekNumber = getWeek(event.startDateTime)
            const monthNumber = getMonthIndex(event.startDateTime)
            const year = getYear(event.startDateTime)
            const duration = getDurationHours(event.startDateTime, event.endDateTime)
            totalDuration += duration
            return this.tableUtil.makeEntity(
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
            )
        })
        const batch = this.tableUtil.createBatch()
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
        const entities = await this.getTimeEntries({
            resourceId,
            periodId,
        }, { noParse: true })
        const batch = this.tableUtil.createBatch()
        entities.forEach(entity => batch.deleteEntity(entity))
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
            const query = this.tableUtil.createQuery(1000, undefined, filter)
            let result = await this.tableUtil.queryTableAll(
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
            const entry = await this.tableUtil.retrieveEntity(
                'ConfirmedPeriods',
                resourceId,
                periodId
            )
            return this.tableUtil.parseEntity(entry)
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
        const { string, double, int } = this.tableUtil.entGen()
        const entity = await this.tableUtil.addEntity(
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
        const { string } = this.tableUtil.entGen()
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
            const query = this.tableUtil.createQuery(1000, undefined)
            let { entries } = await this.tableUtil.queryTable('Roles', query, { RowKey: 'id' })
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
     */
    async addRole(role) {
        const { string } = this.tableUtil.entGen()
        const entity = await this.tableUtil.addEntity(
            'Roles',
            {
                PartitionKey: string('Default'),
                RowKey: string(uuidv4()),
                Name: string(role.name),
                Permissions: string(role.permissions.join('|'))
            }
        )
        return entity
    }

    /**
     * Update role in table Roles
     * 
     * @param role The role data
     */
    async updateRole(role) {
        const { string } = this.tableUtil.entGen()
        const entity = {
            PartitionKey: string('Default'),
            RowKey: string(role.id),
            Permissions: string(role.permissions.join('|'))
        }
        const result = await this.tableUtil.updateEntity(
            'Roles',
            entity,
            true,
        )
        return result
    }
}

module.exports = StorageService