const _ = require('underscore')
const tableUtil = require('../utils/table')
const { getDurationHours } = require('../utils')
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
        const { entries } = await tableUtil.queryTable('Labels', query)
        return tableUtil.parseEntities(entries)
    }
    async addLabel(label) {
        const { string } = tableUtil.entGen();
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
        const { string } = tableUtil.entGen();
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
        const { string } = tableUtil.entGen();
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
    async getUser(userId) {
        let filter = TableQuery.stringFilter('RowKey', TableUtilities.QueryComparisons.EQUAL, userId)
        const query = tableUtil.createQuery(1).where(filter)
        const { entries } = await tableUtil.queryTable(
            'Users',
            query,
        )
        return first(tableUtil.parseEntities(entries))
    }
    async updateUser(user) {
        const { string } = tableUtil.entGen();
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
    async createProject(model, createdBy) {
        const { string } = tableUtil.entGen();
        const projectId = (`${model.customerKey} ${model.projectKey}`).toUpperCase()
        const entity = await tableUtil.addEntity(
            'Projects',
            {
                PartitionKey: string('Default'),
                RowKey: string(projectId),
                Name: string(model.name),
                Description: string(model.description),
                CustomerKey: string(model.customerKey.toUpperCase()),
                Icon: string(model.icon || 'Page'),
                CreatedBy: string(createdBy),
            }
        )
        return entity
    }
    async createCustomer(model, createdBy) {
        const { string } = tableUtil.entGen();
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

    async addUser(user) {
        const { string } = tableUtil.entGen();
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
    async getCustomers() {
        const query = tableUtil.createQuery(1000)
        const { entries } = await tableUtil.queryTable(
            'Customers',
            query
        )
        return tableUtil.parseEntities(entries, undefined, { idUpper: true })
    }
    async getProjects(customerKey, options) {
        options = options || {}
        let filter = null
        if (customerKey)
            filter = TableQuery.stringFilter('CustomerKey', TableUtilities.QueryComparisons.EQUAL, customerKey)
        let query = tableUtil.createQuery(1000, undefined, filter)
        let { entries } = await tableUtil.queryTable(
            'Projects',
            query
        )
        if (!options.noParse) entries = tableUtil.parseEntities(entries, undefined, { idUpper: true })
        if (options.sortBy) entries = arraySort(entries, options.sortBy)
        return entries
    }
    async getTimeEntries(filters, options) {
        filters = filters || {}
        options = options || {}
        let filter = TableQuery.stringFilter('PartitionKey', TableUtilities.QueryComparisons.EQUAL, 'Default')
        if (filters.projectId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ProjectId', TableUtilities.QueryComparisons.EQUAL, filters.projectId))
        if (filters.resourceId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ResourceId', TableUtilities.QueryComparisons.EQUAL, filters.resourceId))
        if (filters.weekNumber) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('WeekNumber', TableUtilities.QueryComparisons.EQUAL, filters.weekNumber))
        if (filters.year) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('Year', TableUtilities.QueryComparisons.EQUAL, filters.year))
        if (filters.startDateTime) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.dateFilter('StartTime', TableUtilities.QueryComparisons.GREATER_THAN, TableUtilities.entityGenerator.DateTime(new Date(filters.startDateTime))._))
        if (filters.endDateTime) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.dateFilter('StartTime', TableUtilities.QueryComparisons.LESS_THAN, TableUtilities.entityGenerator.DateTime(new Date(filters.endDateTime))._))
        let query = tableUtil.createQuery(1000, undefined, filter)
        let result = await tableUtil.queryTableAll('TimeEntries', query)
        if (!options.noParse) {
            result = tableUtil.parseEntities(result, res => {
                if (res.projectId) res.customerId = _.first(res.projectId.split(' '))
                return res
            }, options)
        }
        result = result.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
        return result
    }
    async getUsers() {
        const query = tableUtil.createQuery(1000, undefined)
        const { entries } = await tableUtil.queryTable('Users', query)
        return tableUtil.parseEntities(entries)
    }
    async getUser(userId) {
        const entry = await tableUtil.retrieveEntity(
            'Users',
            'Default',
            userId
        )
        return tableUtil.parseEntities([entry])[0]
    }
    async deleteCustomer(key) {
        const { string } = tableUtil.entGen();
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
    async deleteProject(key) {
        const { string } = tableUtil.entGen();
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
        const { string } = tableUtil.entGen();
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
    async addTimeEntries(timeentries) {
        const { string, datetime, double, int, boolean } = tableUtil.entGen();
        const entities = timeentries.map(entry => ({
            PartitionKey: string(user.profile.oid),
            RowKey: string(entry.id),
            ResourceName: string(user.profile.displayName),
            Title: string(event.title),
            Description: string(event.body),
            StartTime: datetime(event.startTime),
            EndTime: datetime(event.endTime),
            Duration: double(getDurationHours(event.startTime, event.endTime)),
            ProjectId: string(entry.projectId),
            WebLink: string(event.webLink),
            WeekNumber: int(getWeek(event.startTime)),
            MonthNumber: int(getMonthIndex(event.startTime)),
            Year: int(getYear(event.startTime)),
            ManualMatch: boolean(entry.isManualMatch),
        }));
        const batch = tableUtil.createBatch();
        entities.forEach(entity => batch.insertEntity(entity))
        await tableUtil.executeBatch('TimeEntries', batch)
    }
}

module.exports = StorageService