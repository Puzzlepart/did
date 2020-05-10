const _ = require('underscore');
const tableUtils = require('../utils/table');
const arraySort = require('array-sort');
const { first, pick } = require('underscore');
const { TableUtilities, TableQuery } = require('azure-storage');
const uuidv4 = require('uuid').v4;

class StorageService {
    constructor(tid) {
        this.tenantId = tid;
        this.filter = TableQuery.stringFilter('PartitionKey', TableUtilities.QueryComparisons.EQUAL, this.tenantId);
    }

    /**
     * Checks if the tenant id has a active subscription
     */
    getSubscription() {
        return new Promise(async (resolve) => {
            const query = tableUtils.createQuery(1, ['Name']).where('RowKey eq ?', this.tenantId);
            var { entries } = await tableUtils.queryTable('Subscriptions', query);
            resolve(first(tableUtils.parseArray(entries)));
        });
    }

    /**
     * Get labels
     */
    async getLabels() {
        const query = tableUtils.createQuery(1000, undefined, this.filter);
        const { entries } = await tableUtils.queryTable('Labels', query);
        return tableUtils.parseArray(entries);
    }

    /**
     * Add label
     *
     * @param {*} label
     */
    async addLabel(label) {
        let entity = await tableUtils.addEntity('Labels', {
            PartitionKey: tableUtils.entGen.String(this.tenantId),
            RowKey: tableUtils.entGen.String(uuidv4()),
            Name: tableUtils.entGen.String(label.name),
            Color: tableUtils.entGen.String(label.color),
            Icon: tableUtils.entGen.String(label.icon),
        });
        return entity;
    }

    /**
     * Update label
     * 
     * @param {*} label
     */
    async updateLabel(label) {
        const entity = {
            PartitionKey: tableUtils.entGen.String(this.tenantId),
            RowKey: tableUtils.entGen.String(label.id),
        };
        if (label.name) entity.Name = tableUtils.entGen.String(label.name);
        if (label.color) entity.Color = tableUtils.entGen.String(label.color);
        if (label.icon) entity.Icon = tableUtils.entGen.String(label.icon);
        const result = await tableUtils.updateEntity('Labels', entity, true);
        return result;
    }

    /**
     * Delete label
     * 
     * @param {*} id
     */
    async deleteLabel(id) {
        console.log(this.tenantId, id);
        try {
            const result = await tableUtils.deleteEntity('Labels', {
                PartitionKey: tableUtils.entGen.String(this.tenantId),
                RowKey: tableUtils.entGen.String(id),
            });
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    /**
     * Get user
     *
     * @param {*} userId
     */
    async getUser(userId) {
        let filter = TableQuery.combineFilters(this.filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('RowKey', TableUtilities.QueryComparisons.EQUAL, userId));
        const query = tableUtils.createQuery(1, ['Role', 'StartPage']).where(filter);
        const { entries } = await tableUtils.queryTable('Users', query);
        return first(tableUtils.parseArray(entries));
    }
    /**
     * Update user
     * 
     * @param {*} user
     */
    async updateUser(user) {
        const entity = {
            PartitionKey: tableUtils.entGen.String(this.tenantId),
            RowKey: tableUtils.entGen.String(user.id),
        };
        if (user.fullName) entity.FullName = tableUtils.entGen.String(user.fullName);
        if (user.role) entity.Role = tableUtils.entGen.String(user.role);
        if (user.userLanguage) entity.UserLanguage = tableUtils.entGen.String(user.userLanguage);
        const result = await tableUtils.updateEntity('Users', entity, true);
        return result;
    }
    
    /**
     * Create project
     *
     * @param {*} model
     * @param {*} createdBy
     */
    async createProject(model, createdBy) {
        let projectId = (`${model.customerKey} ${model.projectKey}`).toUpperCase();
        let entity = await tableUtils.addEntity('Projects', {
            PartitionKey: tableUtils.entGen.String(this.tenantId),
            RowKey: tableUtils.entGen.String(projectId),
            Name: tableUtils.entGen.String(model.name),
            Description: tableUtils.entGen.String(model.description),
            CustomerKey: tableUtils.entGen.String(model.customerKey.toUpperCase()),
            Icon: tableUtils.entGen.String(model.icon || 'Page'),
            CreatedBy: tableUtils.entGen.String(createdBy),
        });
        return entity;
    }

    /**
     * Create customer
     *
     * @param {*} model
     * @param {*} createdBy
     */
    async createCustomer(model, createdBy) {
        let entity = await tableUtils.addEntity('Customers', {
            PartitionKey: tableUtils.entGen.String(this.tenantId),
            RowKey: tableUtils.entGen.String(model.key.toUpperCase()),
            Name: tableUtils.entGen.String(model.name),
            Description: tableUtils.entGen.String(model.description),
            Icon: tableUtils.entGen.String(model.icon || 'Page'),
            CreatedBy: tableUtils.entGen.String(createdBy),
        });
        return entity;
    }

    /**
     * Add user
     *
     * @param {*} user
     */
    async addUser(user) {
        let entity = await tableUtils.addEntity('Users', {
            PartitionKey: tableUtils.entGen.String(this.tenantId),
            RowKey: tableUtils.entGen.String(user.id),
            FullName: tableUtils.entGen.String(user.fullName),
            Role: tableUtils.entGen.String(user.role),
        });
        return entity;
    }

    /**
     * Get customers
     */
    async getCustomers() {
        const query = tableUtils.createQuery(1000, undefined, this.filter);
        const { entries } = await tableUtils.queryTable('Customers', query);
        return tableUtils.parseArray(entries, undefined, { idUpper: true });
    }

    /**
     * Get projects
     *
     * @param {*} customerKey
     * @param {*} options
     */
    async getProjects(customerKey, options) {
        options = options || {};
        let filter = this.filter;
        if (customerKey)
            filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('CustomerKey', TableUtilities.QueryComparisons.EQUAL, customerKey));
        let query = tableUtils.createQuery(1000, undefined, filter);
        let { entries } = await tableUtils.queryTable('Projects', query);
        if (!options.noParse)
            entries = tableUtils.parseArray(entries, undefined, { idUpper: true });
        if (options.sortBy)
            entries = arraySort(entries, options.sortBy);
        return entries;
    }

    /**
     * Get time entries
     *
     * @param {*} filters
     * @param {*} options
     */
    async getTimeEntries(filters, options) {
        filters = filters || {};
        options = options || {};
        let filter = this.filter;
        if (filters.projectId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ProjectId', TableUtilities.QueryComparisons.EQUAL, filters.projectId));
        if (filters.resourceId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ResourceId', TableUtilities.QueryComparisons.EQUAL, filters.resourceId));
        if (filters.weekNumber) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('WeekNumber', TableUtilities.QueryComparisons.EQUAL, filters.weekNumber));
        if (filters.yearNumber) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('YearNumber', TableUtilities.QueryComparisons.EQUAL, filters.yearNumber));
        if (filters.startDateTime) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.dateFilter('StartTime', TableUtilities.QueryComparisons.GREATER_THAN, tableUtils.entGen.DateTime(new Date(filters.startDateTime))._));
        if (filters.endDateTime) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.dateFilter('StartTime', TableUtilities.QueryComparisons.LESS_THAN, tableUtils.entGen.DateTime(new Date(filters.endDateTime))._));
        let query = tableUtils.createQuery(1000, undefined, filter);
        let result = await tableUtils.queryTableAll('ConfirmedTimeEntries', query);
        if (!options.noParse) {
            result = tableUtils.parseArray(result, res => {
                if (res.projectId) res.customerId = _.first(res.projectId.split(' '));
                return res;
            }, options);
        }
        result = result.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        return result;
    }

    /**
     * Get users
     */
    async getUsers() {
        const query = tableUtils.createQuery(1000, undefined).where(this.filter);
        const { entries } = await tableUtils.queryTable('Users', query);
        return tableUtils.parseArray(entries);
    }

    /**
     * Get current user
     *
     * @param {*} userId
     */
    async getUser(userId) {
        const entry = await tableUtils.retrieveEntity('Users', this.tenantId, userId);
        return tableUtils.parseArray([entry])[0];
    }

    /**
     * Delete customer
     *
     * @param {*} key
     */
    async deleteCustomer(key) {
        try {
            const result = await tableUtils.deleteEntity('Customers', {
                PartitionKey: tableUtils.entGen.String(this.tenantId),
                RowKey: tableUtils.entGen.String(key),
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Delete project
     *
     * @param {*} key
     */
    async deleteProject(key) {
        try {
            const result = await tableUtils.deleteEntity('Projects', {
                PartitionKey: tableUtils.entGen.String(this.tenantId),
                RowKey: tableUtils.entGen.String(key),
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Add label to project
     *
     * @param {*} projectKey
     * @param {*} labelId
     */
    async addLabelToProject(projectId, labelId) {
        const entity = await tableUtils.retrieveEntity('Projects', this.tenantId, projectId);
        let labels = entity.Labels ? entity.Labels._.split(";") : []
        labels.push(labelId);
        const updatedEntity = {
            ...pick(entity, 'PartitionKey', 'RowKey'),
            Labels: tableUtils.entGen.String(labels.join(';')),
        }
        const result = await tableUtils.updateEntity('Projects', updatedEntity, true);
        return result;
    }
}

module.exports = StorageService;