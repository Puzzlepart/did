const tableUtil = require('../utils/table')
const { getDurationHours, getWeek, getMonthIndex, getYear } = require('../utils')
const arraySort = require('array-sort')
const { pick } = require('underscore')
const { createTableService } = require('azure-storage')
const uuidv4 = require('uuid').v4

class StorageService {
    constructor(subscription) {
        tableUtil.tableService = createTableService(subscription.connectionString)
    }

    async getLabels() {
        const query = tableUtil.createQuery(1000, undefined)
        const { entries } = await tableUtil.queryTable('Labels', query, {
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
    async addLabel(label, createdBy) {
        const { string } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
            'Labels',
            {
                PartitionKey: string('Default'),
                RowKey: string(uuidv4()),
                Name: string(label.name),
                Color: string(label.color),
                Icon: string(label.icon),
                CreatedBy: string(createdBy),
            }
        )
        return entity
    }

    /**
     * Update label in table Labels
     * 
     * @param label Label data
     */
    async updateLabel(label) {
        const { string } = tableUtil.entGen()
        const entity = {
            PartitionKey: string('Default'),
            RowKey: string(label.id),
        }
        if (label.name) entity.Name = string(label.name)
        if (label.color) entity.Color = string(label.color)
        if (label.icon) entity.Icon = string(label.icon)
        const result = await tableUtil.updateEntity(
            'Labels',
            entity,
            true,
        )
        return result
    }

    /**
    * Delete label from table Labels
    * 
    * @param id Label ID
    */
    async deleteLabel(id) {
        const { string } = tableUtil.entGen()
        try {
            const result = await tableUtil.deleteEntity(
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
     */
    async getCustomers() {
        const query = tableUtil.createQuery(1000)
        const { entries } = await tableUtil.queryTable('Customers', query, { RowKey: 'key' })
        return entries
    }

    /**
     * Create customer in table Customers
     * 
     * @param customer Customer data
     * @param createdBy Created by ID
     */
    async createCustomer(customer, createdBy) {
        const { string } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
            'Customers',
            {
                PartitionKey: string('Default'),
                RowKey: string(customer.key.toUpperCase()),
                Name: string(customer.name),
                Description: string(customer.description),
                Icon: string(customer.icon || 'Page'),
                CreatedBy: string(createdBy),
            }
        )
        return entity
    }

    /**
     * Delete customer from table Custoemrs
     * 
     * @param key Customer key
     */
    async deleteCustomer(key) {
        const { string } = tableUtil.entGen()
        try {
            const result = await tableUtil.deleteEntity(
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
    async getProjects(customerKey, options) {
        options = options || {}
        const q = tableUtil.query()
        const filter = [['PartitionKey', customerKey, q.string, q.equal]]
        const query = tableUtil.createQuery(1000, undefined, filter)
        const parse = !options.noParse
        let { entries } = await tableUtil.queryTable(
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
     * Create project in table Projects
     * 
     * @param project Project data
     * @param createdBy Created by ID
     */
    async createProject(project, createdBy) {
        const { string } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
            'Projects',
            {
                PartitionKey: string(project.customerKey),
                RowKey: string(project.key),
                Id: string([project.customerKey, project.key].join(' ')),
                Name: string(project.name),
                Description: string(project.description),
                Icon: string(project.icon || 'Page'),
                CreatedBy: string(createdBy),
            }
        )
        return entity
    }

    /**
     * Add label to project
     * 
     * @param projectId Project ID
     * @param labelId Label ID
     */
    async addLabelToProject(projectId, labelId) {
        const { string } = tableUtil.entGen()
        const entity = await tableUtil.retrieveEntity(
            'Projects',
            'Default',
            projectId,
        )
        let labels = entity.Labels ? entity.Labels._.split("") : []
        labels.push(labelId)
        const updatedEntity = {
            ...pick(entity, 'PartitionKey', 'RowKey'),
            Labels: string(labels.join('')),
        }
        const result = await tableUtil.updateEntity('Projects', updatedEntity, true)
        return result
    }

    /**
     * Get users from table Users
     */
    async getUsers() {
        const query = tableUtil.createQuery(1000, undefined)
        const { entries } = await tableUtil.queryTable('Users', query, { RowKey: 'id' })
        return entries
    }

    /**
     * Get user from table Users
     * 
     * @param userId The user ID
     */
    async getUser(userId) {
        try {
            const entry = await tableUtil.retrieveEntity(
                'Users',
                'Default',
                userId
            )
            return tableUtil.parseEntity(entry, { RowKey: 'id' })
        } catch (error) {
            return null
        }
    }

    /**
     * Add user to table Users
     * 
     * @param user The user data
     */
    async addUser(user) {
        const { string } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
            'Users',
            {
                PartitionKey: string('Default'),
                RowKey: string(user.id),
                FullName: string(user.fullName),
                Role: string(user.role),
            }
        )
        return entity
    }

    /**
     * Update user in table Users
     * 
     * @param user The user data
     */
    async updateUser(user) {
        const { string } = tableUtil.entGen()
        const entity = {
            PartitionKey: string('Default'),
            RowKey: string(user.id),
        }
        if (user.fullName) entity.FullName = string(user.fullName)
        if (user.role) entity.Role = string(user.role)
        if (user.userLanguage) entity.UserLanguage = string(user.userLanguage)
        if (user.userTheme) entity.UserTheme = string(user.userTheme)
        const result = await tableUtil.updateEntity(
            'Users',
            entity,
            true,
        )
        return result
    }

    /**
     * Get entries from table TimeEntries
     * 
     * @param filterValues Filtervalues
     * @param options Options
     */
    async getTimeEntries({ projectId, resourceId, weekNumber, year, startDateTime, endDateTime }, options) {
        options = options || {}
        const q = tableUtil.query()
        const filter = [
            ['ProjectId', projectId, q.string, q.equal],
            ['PartitionKey', resourceId, q.string, q.equal],
            ['WeekNumber', weekNumber, q.int, q.equal],
            ['Year', year, q.int, q.equal],
            ['StartDateTime', tableUtil.convertDate(startDateTime), q.date, q.greaterThan],
            ['EndDateTime', tableUtil.convertDate(endDateTime), q.date, q.lessThan],
        ]
        const query = tableUtil.createQuery(1000, undefined, filter)
        let result = await tableUtil.queryTableAll(
            'TimeEntries',
            query,
            !options.noParse && {
                PartitionKey: 'resourceId',
                RowKey: 'id'
            }
        )
        result = result.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
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
        const { string, datetime, double, int, boolean } = tableUtil.entGen()
        const entities = timeentries.map(({ entry, event, user, }) => {
            const week = getWeek(event.startDateTime)
            const monthIdx = getMonthIndex(event.startDateTime)
            const duration = getDurationHours(event.startDateTime, event.endDateTime)
            totalDuration += duration
            return {
                PartitionKey: string(user.id),
                RowKey: string(entry.id),
                ResourceName: string(user.profile.displayName),
                Title: string(event.title),
                Description: string(event.body),
                StartDateTime: datetime(event.startDateTime),
                EndDateTime: datetime(event.endDateTime),
                Duration: double(duration),
                ProjectId: string(entry.projectId),
                WebLink: string(event.webLink),
                WeekNumber: int(week),
                MonthNumber: int(monthIdx),
                PeriodId: string(periodId),
                Year: int(getYear(event.startDateTime)),
                ManualMatch: boolean(entry.manualMatch),
            }
        })
        const batch = tableUtil.createBatch()
        entities.forEach(entity => batch.insertEntity(entity))
        await tableUtil.executeBatch('TimeEntries', batch)
        return totalDuration
    }

    /**
     * Delete the user entries from table TimeEntries
     * 
     * @param period Period
     * @param resourceId ID of the resource
     */
    async deleteUserTimeEntries(period, resourceId) {
        const entities = await this.getTimeEntries({
            resourceId,
            startDateTime: period.startDateTime,
            endDateTime: period.endDateTime,
        }, { noParse: true })
        const batch = tableUtil.createBatch()
        entities.forEach(entity => batch.deleteEntity(entity))
        await tableUtil.executeBatch('TimeEntries', batch)
    }

    /**
     * Get entry for the period from table ConfirmedPeriods
     * 
     * @param resourceId ID of the resource
     * @param periodId The period
     */
    async getConfirmedPeriod(resourceId, periodId) {
        try {
            const entry = await tableUtil.retrieveEntity(
                'ConfirmedPeriods',
                resourceId,
                periodId
            )
            return tableUtil.parseEntity(entry)
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
        const { string, double,int } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
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
        const { string } = tableUtil.entGen()
        try {
            const result = await tableUtil.deleteEntity(
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
}

module.exports = StorageService