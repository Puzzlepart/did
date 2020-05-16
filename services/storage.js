const tableUtil = require('../utils/table')
const { getDurationHours, getWeek, getMonthIndex, getYear } = require('../utils')
const arraySort = require('array-sort')
const { first, pick } = require('underscore')
const { TableUtilities, TableQuery, createTableService } = require('azure-storage')
const uuidv4 = require('uuid').v4

class StorageService {
    constructor(subscription) {
        tableUtil.tableService = createTableService(subscription.connectionString)
    }

    async getLabels() {
        const query = tableUtil.createQuery(1000, undefined)
        const { entries } = await tableUtil.queryTable('Labels', query, {})
        return entries
    }

    async addLabel(label) {
        const { string } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
            'Labels',
            {
                PartitionKey: string('Default'),
                RowKey: string(uuidv4()),
                Name: string(label.name),
                Color: string(label.color),
                Icon: string(label.icon),
            }
        )
        return entity
    }

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

    async getCustomers() {
        const query = tableUtil.createQuery(1000)
        const { entries } = await tableUtil.queryTable('Customers', query, { RowKey: 'key' })
        return entries
    }

    async createCustomer(model, createdBy) {
        const { string } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
            'Customers',
            {
                PartitionKey: string('Default'),
                RowKey: string(model.key.toUpperCase()),
                Name: string(model.name),
                Description: string(model.description),
                Icon: string(model.icon || 'Page'),
                CreatedBy: string(createdBy),
            }
        )
        return entity
    }

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

    async deleteProject(key) {
        const { string } = tableUtil.entGen()
        try {
            const result = await tableUtil.deleteEntity(
                'Projects',
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

    async getUsers() {
        const query = tableUtil.createQuery(1000, undefined)
        const { entries } = await tableUtil.queryTable('Users', query, {})
        return entries
    }

    async getUser(userId) {
        try {
            const entry = await tableUtil.retrieveEntity(
                'Users',
                'Default',
                userId
            )
            return tableUtil.parseEntity(entry)
        } catch (error) {
            return null
        }
    }

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

    async updateUser(user) {
        const { string } = tableUtil.entGen()
        const entity = {
            PartitionKey: string('Default'),
            RowKey: string(user.id),
        }
        if (user.fullName) entity.FullName = string(user.fullName)
        if (user.role) entity.Role = string(user.role)
        if (user.userLanguage) entity.UserLanguage = string(user.userLanguage)
        const result = await tableUtil.updateEntity(
            'Users',
            entity,
            true,
        )
        return result
    }

    async getTimeEntries(filters, options) {
        filters = filters || {}
        options = options || {}
        const { datetime } = tableUtil.entGen()
        const q = tableUtil.query()
        const filter = [
            ['ProjectId', filters.projectId, q.string, q.equal],
            ['PartitionKey', filters.resourceId, q.string, q.equal],
            ['WeekNumber', filters.weekNumber, q.int, q.equal],
            ['Year', filters.year, q.int, q.equal],
            ['StartTime', filters.startDateTime && datetime(new Date(filters.startDateTime))._, q.date, q.greaterThan],
            ['EndTime', filters.endDateTime && datetime(new Date(filters.endDateTime))._, q.date, q.lessThan],
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
        result = result.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
        return result
    }

    async addTimeEntries(timeentries) {
        let totalDuration = 0
        const { string, datetime, double, int, boolean } = tableUtil.entGen()
        const entities = timeentries.map(({ entry, event, user, }) => {
            const week = getWeek(event.startTime)
            const month = getMonthIndex(event.startTime)
            const duration = getDurationHours(event.startTime, event.endTime)
            totalDuration += duration
            return {
                PartitionKey: string(user.profile.oid),
                RowKey: string(entry.id),
                ResourceName: string(user.profile.displayName),
                Title: string(event.title),
                Description: string(event.body),
                StartTime: datetime(event.startTime),
                EndTime: datetime(event.endTime),
                Duration: double(duration),
                ProjectId: string(entry.projectId),
                WebLink: string(event.webLink),
                WeekNumber: int(week),
                MonthNumber: int(month),
                PeriodId: string(`${week}_${month}`),
                Year: int(getYear(event.startTime)),
                ManualMatch: boolean(entry.isManualMatch),
            }
        })
        const batch = tableUtil.createBatch()
        entities.forEach(entity => batch.insertEntity(entity))
        await tableUtil.executeBatch('TimeEntries', batch)
        return totalDuration
    }

    async deleteTimeEntries(filters) {
        filters = filters || {}
        const entities = await this.getTimeEntries(filters, { noParse: true })
        const batch = tableUtil.createBatch()
        entities.forEach(entity => batch.deleteEntity(entity))
        await tableUtil.executeBatch('TimeEntries', batch)
    }

    async getConfirmedPeriod(resourceId, period) {
        try {
            const entry = await tableUtil.retrieveEntity(
                'ConfirmedPeriods',
                resourceId,
                period
            )
            return tableUtil.parseEntity(entry)
        } catch (error) {
            return null
        }
    }

    async addConfirmedPeriod(resourceId, period, hours) {
        const { string, double } = tableUtil.entGen()
        const entity = await tableUtil.addEntity(
            'ConfirmedPeriods',
            {
                PartitionKey: string(resourceId),
                RowKey: string(period),
                Hours: double(hours),
            }
        )
        return entity
    }

    async removeConfirmedPeriod(resourceId, period) {
        const { string } = tableUtil.entGen()
        try {
            const result = await tableUtil.deleteEntity(
                'ConfirmedPeriods',
                {
                    PartitionKey: string(resourceId),
                    RowKey: string(period),
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