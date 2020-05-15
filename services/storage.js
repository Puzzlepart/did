const _ = require('underscore')
const tableUtil = require('../utils/table')
const arraySort = require('array-sort')
const { first, pick } = require('underscore')
const { TableUtilities, TableQuery, createTableService } = require('azure-storage')
const uuidv4 = require('uuid').v4

class StorageService {
    constructor(subscription) {
        tableUtil.tableService = createTableService(subscription.connectionString)
    }
    /**
     * Get labels
     */
    async getLabels() {
        const query = tableUtil.createQuery(1000, undefined)
        const { entries } = await tableUtil.queryTable('Labels', query)
        return tableUtil.parseEntities(entries)
    }
    /**
     * Add label
     *
     * @param {*} label
     */
    async addLabel(label) {
        let entity = await tableUtil.addEntity(
            'Labels',
            {
                PartitionKey: TableUtilities.entityGenerator.String('Default'),
                RowKey: TableUtilities.entityGenerator.String(uuidv4()),
                Name: TableUtilities.entityGenerator.String(label.name),
                Color: TableUtilities.entityGenerator.String(label.color),
                Icon: TableUtilities.entityGenerator.String(label.icon),
            }
        )
        return entity
    }
    /**
     * Update label
     * 
     * @param {*} label
     */
    async updateLabel(label) {
        const entity = {
            PartitionKey: TableUtilities.entityGenerator.String('Default'),
            RowKey: TableUtilities.entityGenerator.String(label.id),
        }
        if (label.name) entity.Name = TableUtilities.entityGenerator.String(label.name)
        if (label.color) entity.Color = TableUtilities.entityGenerator.String(label.color)
        if (label.icon) entity.Icon = TableUtilities.entityGenerator.String(label.icon)
        const result = await tableUtil.updateEntity(
            'Labels',
            entity,
            true,
        )
        return result
    }
    /**
     * Delete label
     * 
     * @param {*} id
     */
    async deleteLabel(id) {
        try {
            const result = await tableUtil.deleteEntity(
                'Labels',
                {
                    PartitionKey: TableUtilities.entityGenerator.String('Default'),
                    RowKey: TableUtilities.entityGenerator.String(id),
                }
            )
            return result
        }
        catch (error) {
            throw error
        }
    }
    /**
     * Get user
     *
     * @param {*} userId
     */
    async getUser(userId) {
        let filter = TableQuery.stringFilter('RowKey', TableUtilities.QueryComparisons.EQUAL, userId);
        const query = tableUtil.createQuery(1).where(filter)
        const { entries } = await tableUtil.queryTable(
            'Users',
            query,
        )
        return first(tableUtil.parseEntities(entries))
    }
    /**
     * Update user
     * 
     * @param {*} user
     */
    async updateUser(user) {
        const entity = {
            PartitionKey: TableUtilities.entityGenerator.String('Default'),
            RowKey: TableUtilities.entityGenerator.String(user.id),
        }
        if (user.fullName) entity.FullName = TableUtilities.entityGenerator.String(user.fullName)
        if (user.role) entity.Role = TableUtilities.entityGenerator.String(user.role)
        if (user.userLanguage) entity.UserLanguage = TableUtilities.entityGenerator.String(user.userLanguage)
        const result = await tableUtil.updateEntity(
            'Users',
            entity,
            true,
        )
        return result
    }
    /**
     * Create project
     *
     * @param {*} model
     * @param {*} createdBy
     */
    async createProject(model, createdBy) {
        let projectId = (`${model.customerKey} ${model.projectKey}`).toUpperCase()
        let entity = await tableUtil.addEntity(
            'Projects',
            {
                PartitionKey: TableUtilities.entityGenerator.String('Default'),
                RowKey: TableUtilities.entityGenerator.String(projectId),
                Name: TableUtilities.entityGenerator.String(model.name),
                Description: TableUtilities.entityGenerator.String(model.description),
                CustomerKey: TableUtilities.entityGenerator.String(model.customerKey.toUpperCase()),
                Icon: TableUtilities.entityGenerator.String(model.icon || 'Page'),
                CreatedBy: TableUtilities.entityGenerator.String(createdBy),
            }
        )
        return entity
    }
    /**
     * Create customer
     *
     * @param {*} model
     * @param {*} createdBy
     */
    async createCustomer(model, createdBy) {
        let entity = await tableUtil.addEntity(
            'Customers',
            {
                PartitionKey: TableUtilities.entityGenerator.String('Default'),
                RowKey: TableUtilities.entityGenerator.String(model.key.toUpperCase()),
                Name: TableUtilities.entityGenerator.String(model.name),
                Description: TableUtilities.entityGenerator.String(model.description),
                Icon: TableUtilities.entityGenerator.String(model.icon || 'Page'),
                CreatedBy: TableUtilities.entityGenerator.String(createdBy),
            }
        )
        return entity
    }
    /**
     * Add user
     *
     * @param {*} user
     */
    async addUser(user) {
        let entity = await tableUtil.addEntity(
            'Users',
            {
                PartitionKey: TableUtilities.entityGenerator.String('Default'),
                RowKey: TableUtilities.entityGenerator.String(user.id),
                FullName: TableUtilities.entityGenerator.String(user.fullName),
                Role: TableUtilities.entityGenerator.String(user.role),
            }
        )
        return entity
    }
    /**
     * Get customers
     */
    async getCustomers() {
        const query = tableUtil.createQuery(1000)
        const { entries } = await tableUtil.queryTable(
            'Customers',
            query
        )
        return tableUtil.parseEntities(entries, undefined, { idUpper: true })
    }
    /**
     * Get projects
     *
     * @param {*} customerKey
     * @param {*} options
     */
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
    /**
     * Get time entries
     *
     * @param {*} filters
     * @param {*} options
     */
    async getTimeEntries(filters, options) {
        filters = filters || {}
        options = options || {}
        let filter = TableQuery.stringFilter('PartitionKey', TableUtilities.QueryComparisons.EQUAL, 'Default')
        if (filters.projectId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ProjectId', TableUtilities.QueryComparisons.EQUAL, filters.projectId))
        if (filters.resourceId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ResourceId', TableUtilities.QueryComparisons.EQUAL, filters.resourceId))
        if (filters.weekNumber) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('WeekNumber', TableUtilities.QueryComparisons.EQUAL, filters.weekNumber))
        if (filters.yearNumber) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('YearNumber', TableUtilities.QueryComparisons.EQUAL, filters.yearNumber))
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
    /**
     * Get users
     */
    async getUsers() {
        const query = tableUtil.createQuery(1000, undefined)
        const { entries } = await tableUtil.queryTable('Users', query)
        return tableUtil.parseEntities(entries)
    }
    /**
     * Get current user
     *
     * @param {*} userId
     */
    async getUser(userId) {
        const entry = await tableUtil.retrieveEntity(
            'Users',
            'Default',
            userId
        )
        return tableUtil.parseEntities([entry])[0]
    }
    /**
     * Delete customer
     *
     * @param {*} key
     */
    async deleteCustomer(key) {
        try {
            const result = await tableUtil.deleteEntity(
                'Customers',
                {
                    PartitionKey: TableUtilities.entityGenerator.String('Default'),
                    RowKey: TableUtilities.entityGenerator.String(key),
                }
            )
            return result
        }
        catch (error) {
            throw error
        }
    }
    /**
     * Delete project
     *
     * @param {*} key
     */
    async deleteProject(key) {
        try {
            const result = await tableUtil.deleteEntity(
                'Projects',
                {
                    PartitionKey: TableUtilities.entityGenerator.String('Default'),
                    RowKey: TableUtilities.entityGenerator.String(key),
                }
            )
            return result
        }
        catch (error) {
            throw error
        }
    }
    /**
     * Add label to project
     *
     * @param {*} projectKey
     * @param {*} labelId
     */
    async addLabelToProject(projectId, labelId) {
        const entity = await tableUtil.retrieveEntity(
            'Projects',
            'Default',
            projectId,
        )
        let labels = entity.Labels ? entity.Labels._.split("") : []
        labels.push(labelId)
        const updatedEntity = {
            ...pick(entity, 'PartitionKey', 'RowKey'),
            Labels: TableUtilities.entityGenerator.String(labels.join('')),
        }
        const result = await tableUtil.updateEntity('Projects', updatedEntity, true)
        return result
    }
}

module.exports = StorageService