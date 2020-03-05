const {
    queryTable,
    queryTableAll,
    parseArray,
    isEqual,
    lt,
    gt,
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

class StorageService {
    constructor(tid) {
        this.tenantId = tid;
        this.filter = stringFilter('PartitionKey', isEqual, this.tenantId);
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
        let filter = combine(this.filter, and, stringFilter('RowKey', isEqual, userId));
        const query = createQuery(1, ['Role', 'StartPage']).where(filter);
        const { entries } = await queryTable('Users', query);
        return parseArray(entries)[0];
    }
    /**
     * Get weeks
     */
    async getWeeks() {
        let query = createQuery(1000, undefined, this.filter);
        const { entries } = await queryTable('Weeks', query);
        const weeks = parseArray(entries);
        return weeks;
    }
    /**
     * Update week
     */
    async updateWeek(weekNumber, closed) {
        const result = await updateEntity('Weeks', {
            PartitionKey: entGen.String(this.tenantId),
            RowKey: entGen.String(weekNumber.toString()),
            Closed: entGen.Boolean(closed),
        });
        return result;
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
            filter = combine(filter, and, stringFilter('CustomerKey', isEqual, customerKey));
        let query = createQuery(1000, undefined, filter);
        let { entries } = await queryTable('Projects', query);
        if (!options.noParse)
            entries = parseArray(entries, undefined, { idUpper: true });
        if (options.sortBy)
            entries = arraySort(entries, options.sortBy);
        return entries;
    }
    /**
     * Get confirmed time entries
     *
     * @param {*} filters
     * @param {*} options
     */
    async getConfirmedTimeEntries(filters, options) {
        filters = filters || {};
        options = options || {};
        let filter = this.filter;
        if (filters.projectId) filter = combine(filter, and, stringFilter('ProjectId', isEqual, filters.projectId));
        if (filters.resourceId) filter = combine(filter, and, stringFilter('ResourceId', isEqual, filters.resourceId));
        if (filters.weekNumber) filter = combine(filter, and, intFilter('WeekNumber', isEqual, filters.weekNumber));
        if (filters.yearNumber) filter = combine(filter, and, intFilter('YearNumber', isEqual, filters.yearNumber));
        if (filters.startDateTime) filter = combine(filter, and, dateFilter('StartTime', gt, entGen.DateTime(new Date(filters.startDateTime))._));
        if (filters.endDateTime) filter = combine(filter, and, dateFilter('StartTime', lt, entGen.DateTime(new Date(filters.endDateTime))._));
        let query = createQuery(1000, undefined, filter);
        let result = await queryTableAll('ConfirmedTimeEntries', query);
        if (!options.noParse) {
            result = parseArray(result, res => ({ ...res, customerId: res.projectId.split(' ')[0], }), options);
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
}















module.exports = StorageService;