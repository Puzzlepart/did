const { queryTable, queryTableAll, parseArray, isEqual, lt, gt, and, combine, stringFilter, intFilter, dateFilter, createQuery, addEntity, updateEntity, entGen } = require('../utils/table');
const log = require('debug')('services/storage');
const arraySort = require('array-sort');

const SUBSCRIPTIONS_TABLE = process.env.AZURE_STORAGE_SUBSCRIPTIONS_TABLE_NAME;
const USERS_TABLE = process.env.AZURE_STORAGE_USERS_TABLE_NAME;
const PROJECTS_TABLE = process.env.AZURE_STORAGE_PROJECTS_TABLE_NAME;
const CUSTOMERS_TABLE = process.env.AZURE_STORAGE_CUSTOMERS_TABLE_NAME;
const CONFIRMEDTIMEENTRIES_TABLE = process.env.AZURE_STORAGE_CONFIRMEDTIMEENTRIES_TABLE_NAME;
const WEEKS_TABLE = 'Weeks';
const FAQ_TABLE = 'FAQ';

function StorageService(tid) {
    this.tenantId = tid;
    this.filter = stringFilter('PartitionKey', isEqual, this.tenantId);
}

/**
 * Checks if the tenant id has a active subscription
 */
StorageService.prototype.getSubscription = function () {
    return new Promise(async (resolve) => {
        const query = createQuery(1, ['Name']).where('RowKey eq ?', this.tenantId);
        var { entries } = await queryTable(SUBSCRIPTIONS_TABLE, query);
        resolve(parseArray(entries)[0]);
    });
};

/**
 * Get user
 * 
 * @param {*} userId 
 */
StorageService.prototype.getUser = async function (userId) {
    let filter = combine(this.filter, and, stringFilter('RowKey', isEqual, userId));
    const query = createQuery(1, ['Role', 'StartPage']).where(filter);
    const { entries } = await queryTable(USERS_TABLE, query);
    return parseArray(entries)[0];
}

/**
 * Get projects
 * 
 * @param {*} customerKey 
 * @param {*} sortBy 
 */
StorageService.prototype.getProjects = async function (customerKey, sortBy) {
    let filter = this.filter;
    if (customerKey) filter = combine(filter, and, stringFilter('CustomerKey', isEqual, customerKey));
    let query = createQuery(1000, undefined, filter);
    const { entries } = await queryTable(PROJECTS_TABLE, query);
    let projects = parseArray(entries, undefined, { idUpper: true });
    if (sortBy) projects = arraySort(projects, sortBy);
    return projects;
}

/**
 * Get weeks
 */
StorageService.prototype.getWeeks = async function () {
    let query = createQuery(1000, undefined, this.filter);
    const { entries } = await queryTable(WEEKS_TABLE, query);
    const weeks = parseArray(entries);
    return weeks;
}

/**
 * Update week
 */
StorageService.prototype.updateWeek = async function (weekNumber, closed) {
    const result = await updateEntity(WEEKS_TABLE, {
        PartitionKey: entGen.String(this.tenantId),
        RowKey: entGen.String(weekNumber.toString()),
        Closed: entGen.Boolean(closed),
    });
    return result;
}

/**
 * Update user
 */
StorageService.prototype.updateUser = async function (user) {
    const result = await updateEntity(USERS_TABLE, {
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
 */
StorageService.prototype.createProject = async function (model) {
    let projectId = (`${model.customerKey} ${model.projectKey}`).toUpperCase();
    let entity = await addEntity(PROJECTS_TABLE, {
        PartitionKey: entGen.String(this.tenantId),
        RowKey: entGen.String(projectId),
        Name: entGen.String(model.name),
        Description: entGen.String(model.description),
        CustomerKey: entGen.String(model.customerKey.toUpperCase()),
        Icon: entGen.String(model.icon || 'Page'),
    });
    return entity;
}

/**
 * Create customer
 * 
 * @param {*} model
 */
StorageService.prototype.createCustomer = async function (model) {
    let entity = await addEntity(CUSTOMERS_TABLE, {
        PartitionKey: entGen.String(this.tenantId),
        RowKey: entGen.String(model.key.toUpperCase()),
        Name: entGen.String(model.name),
        Description: entGen.String(model.description),
        Icon: entGen.String(model.icon || 'Page'),
    });
    return entity;
}

/**
 * Add user
 * 
 * @param {*} user
 */
StorageService.prototype.addUser = async function (user) {
    let entity = await addEntity(USERS_TABLE, {
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
StorageService.prototype.getCustomers = async function () {
    const query = createQuery(1000, undefined, this.filter);
    const { entries } = await queryTable(CUSTOMERS_TABLE, query);
    return parseArray(entries, undefined, { idUpper: true });
}

/**
 * Get confirmed time entries
 * 
 * @param {*} filters 
 * @param {*} options 
 */
StorageService.prototype.getConfirmedTimeEntries = async function (filters, options) {
    filters = filters || {};
    options = options || {};
    let filter = this.filter;
    if (filters.projectId) filter = combine(filter, and, stringFilter('ProjectId', isEqual, filters.projectId));
    if (filters.resourceId) filter = combine(filter, and, stringFilter('ResourceId', isEqual, filters.resourceId));
    if (filters.weekNumber) filter = combine(filter, and, intFilter('WeekNumber', isEqual, filters.weekNumber));
    if (filters.yearNumber) filter = combine(filter, and, intFilter('YearNumber', isEqual, filters.yearNumber));
    if (filters.startDateTime) filter = combine(filter, and, dateFilter('StartTime', gt, entGen.DateTime(new Date(filters.startDateTime))._));
    if (filters.endDateTime) filter = combine(filter, and, dateFilter('StartTime', lt, entGen.DateTime(new Date(filters.endDateTime))._));
    log('Querying table %s with filter %s', CONFIRMEDTIMEENTRIES_TABLE, filter);
    let query = createQuery(1000, undefined, filter);
    let result = await queryTableAll(CONFIRMEDTIMEENTRIES_TABLE, query);
    if (!options.noParse) {
        result = parseArray(result, res => ({ ...res, customerId: res.projectId.split(' ')[0], }), options);
    }
    result = result.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    return result;
}

/**
 * Get users
 */
StorageService.prototype.getUsers = async function () {
    const query = createQuery(1000, undefined).where(this.filter);
    const { entries } = await queryTable(USERS_TABLE, query);
    return parseArray(entries);
}

/**
 * Get labels
 */
StorageService.prototype.getLabels = async function () {
    const query = createQuery(1000, undefined).where(this.filter);
    const { entries } = await queryTable('Labels', query);
    return parseArray(entries);
}

/**
 * Get FAQ
 */
StorageService.prototype.getFAQ = async function () {
    const query = createQuery(1000, undefined).where(this.filter);
    const { entries } = await queryTable(FAQ_TABLE, query);
    return parseArray(entries);
}

module.exports = StorageService;