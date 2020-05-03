const _ = require('underscore');
const uuidv4 = require('uuid').v4;
const {
    queryTable,
    queryTableAll,
    parseArray,
    and,
    combine,
    stringFilter,
    intFilter,
    dateFilter,
    createQuery,
    addEntity,
    retrieveEntity,
    updateEntity,
    deleteEntity,
    entGen,
} = require('../utils/table');
const arraySort = require('array-sort');
const { TableUtilities } = require('azure-storage');

class StorageService {
    constructor(tid) {
        this.tenantId = tid;
        this.filter = stringFilter('PartitionKey', TableUtilities.QueryComparisons.EQUAL, this.tenantId);
    }
    /**
     * Checks if the tenant id has a active subscription
     */
    getSubscription() {
        return new Promise(async (resolve) => {
            const query = createQuery(1, ['Name']).where('RowKey eq ?', this.tenantId);
            var { entries } = await queryTable('Subscriptions', query);
            resolve(parseArray(entries)[0]);
        });
    }
    /**
     * Get user
     *
     * @param {*} userId
     */
    async getUser(userId) {
        let filter = combine(this.filter, and, stringFilter('RowKey', TableUtilities.QueryComparisons.EQUAL, userId));
        const query = createQuery(1, ['Role', 'StartPage']).where(filter);
        const { entries } = await queryTable('Users', query);
        return parseArray(entries)[0];
    }
    /**
     * Update user
     */
    async updateUser(user) {
        const result = await updateEntity('Users', {
            PartitionKey: entGen.String(this.tenantId),
            RowKey: entGen.String(user.id),
            FullName: entGen.String(user.fullName),
            Role: entGen.String(user.role),
        });
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
        let entity = await addEntity('Projects', {
            PartitionKey: entGen.String(this.tenantId),
            RowKey: entGen.String(projectId),
            Name: entGen.String(model.name),
            Description: entGen.String(model.description),
            CustomerKey: entGen.String(model.customerKey.toUpperCase()),
            Icon: entGen.String(model.icon || 'Page'),
            CreatedBy: entGen.String(createdBy),
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
        let entity = await addEntity('Customers', {
            PartitionKey: entGen.String(this.tenantId),
            RowKey: entGen.String(model.key.toUpperCase()),
            Name: entGen.String(model.name),
            Description: entGen.String(model.description),
            Icon: entGen.String(model.icon || 'Page'),
            CreatedBy: entGen.String(createdBy),
        });
        return entity;
    }
    /**
     * Add user
     *
     * @param {*} user
     */
    async addUser(user) {
        let entity = await addEntity('Users', {
            PartitionKey: entGen.String(this.tenantId),
            RowKey: entGen.String(user.id),
            FullName: entGen.String(user.fullName),
            Role: entGen.String(user.role),
        });
        return entity;
    }
    /**
     * Get customers
     */
    async getCustomers() {
        const query = createQuery(1000, undefined, this.filter);
        const { entries } = await queryTable('Customers', query);
        return parseArray(entries, undefined, { idUpper: true });
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
            filter = combine(filter, and, stringFilter('CustomerKey', TableUtilities.QueryComparisons.EQUAL, customerKey));
        let query = createQuery(1000, undefined, filter);
        let { entries } = await queryTable('Projects', query);
        if (!options.noParse)
            entries = parseArray(entries, undefined, { idUpper: true });
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
        if (filters.projectId) filter = combine(filter, and, stringFilter('ProjectId', TableUtilities.QueryComparisons.EQUAL, filters.projectId));
        if (filters.resourceId) filter = combine(filter, and, stringFilter('ResourceId', TableUtilities.QueryComparisons.EQUAL, filters.resourceId));
        if (filters.weekNumber) filter = combine(filter, and, intFilter('WeekNumber', TableUtilities.QueryComparisons.EQUAL, filters.weekNumber));
        if (filters.yearNumber) filter = combine(filter, and, intFilter('YearNumber', TableUtilities.QueryComparisons.EQUAL, filters.yearNumber));
        if (filters.startDateTime) filter = combine(filter, and, dateFilter('StartTime', TableUtilities.QueryComparisons.GREATER_THAN, entGen.DateTime(new Date(filters.startDateTime))._));
        if (filters.endDateTime) filter = combine(filter, and, dateFilter('StartTime', TableUtilities.QueryComparisons.LESS_THAN, entGen.DateTime(new Date(filters.endDateTime))._));
        let query = createQuery(1000, undefined, filter);
        let result = await queryTableAll('ConfirmedTimeEntries', query);
        if (!options.noParse) {
            result = parseArray(result, res => {
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
        const query = createQuery(1000, undefined).where(this.filter);
        const { entries } = await queryTable('Users', query);
        return parseArray(entries);
    }
    /**
     * Get current user
     *
     * @param {*} userId
     */
    async getUser(userId) {
        const entry = await retrieveEntity('Users', this.tenantId, userId);
        return parseArray([entry])[0];
    }
    /**
     * Delete customer
     *
     * @param {*} key
     */
    async deleteCustomer(key) {
        try {
            const result = await deleteEntity('Customers', {
                PartitionKey: entGen.String(this.tenantId),
                RowKey: entGen.String(key),
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
            const result = await deleteEntity('Projects', {
                PartitionKey: entGen.String(this.tenantId),
                RowKey: entGen.String(key),
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get labels
     */
    async getLabels() {
        const query = createQuery(1000, undefined).where(this.filter);
        const { entries } = await queryTable('Labels', query);
        return parseArray(entries);
    }
    /**
     * Add label
     *
     * @param {*} label
     */
    async addLabel(label) {
        let entity = await addEntity('Labels', {
            PartitionKey: entGen.String(this.tenantId),
            RowKey: entGen.String(uuidv4()),
            Name: entGen.String(label.name),
            Description: entGen.String(label.description),
            Color: entGen.String(label.color),
            Icon: entGen.String(label.icon),
        });
        return entity;
    }
    /**
     * Delete label
     *
     * @param {*} key
     */
    async deleteLabel(key) {
        try {
            const result = await deleteEntity('Labels', {
                PartitionKey: entGen.String(this.tenantId),
                RowKey: entGen.String(key),
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}















module.exports = StorageService;