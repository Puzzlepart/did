const { queryTable, queryTableAll, parseArray, isEqual, lt, gt, and, combine, stringFilter, intFilter, dateFilter, createQuery, addEntity, updateEntity, entGen } = require('../utils/table');
const log = require('debug')('services/storage');
const arraySort = require('array-sort');

const SUBSCRIPTIONS = process.env.AZURE_STORAGE_SUBSCRIPTIONS_TABLE_NAME;
const USERS = process.env.AZURE_STORAGE_USERS_TABLE_NAME;
const PROJECTS = process.env.AZURE_STORAGE_PROJECTS_TABLE_NAME;
const CUSTOMERS = process.env.AZURE_STORAGE_CUSTOMERS_TABLE_NAME;
const CONFIRMEDTIMEENTRIES = process.env.AZURE_STORAGE_CONFIRMEDTIMEENTRIES_TABLE_NAME;
const WEEKS = 'Weeks';
const FAQ = 'FAQ';

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
        var { entries } = await queryTable(SUBSCRIPTIONS, query);
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
    const { entries } = await queryTable(USERS, query);
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
    const { entries } = await queryTable(PROJECTS, query);
    let projects = parseArray(entries, undefined, { idUpper: true });
    if (sortBy) projects = arraySort(projects, sortBy);
    return projects;
}

/**
 * Get weeks
 */
StorageService.prototype.getWeeks = async function () {
    let query = createQuery(1000, undefined, this.filter);
    const  { entries } = await queryTable(WEEKS, query);
    const weeks = parseArray(entries);
    return weeks;
}

/**
 * Update week
 */
StorageService.prototype.updateWeek = async function (weekNumber, closed) {
    const result = await updateEntity(WEEKS, {
        PartitionKey: entGen.String(this.tenantId),
        RowKey: entGen.String(weekNumber.toString()),
        Closed: entGen.Boolean(closed),
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
    let entity = await addEntity(PROJECTS, {
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
    let entity = await addEntity(CUSTOMERS, {
        PartitionKey: entGen.String(this.tenantId),
        RowKey: entGen.String(model.key.toUpperCase()),
        Name: entGen.String(model.name),
        Description: entGen.String(model.description),
        Icon: entGen.String(model.icon || 'Page'),
    });
    return entity;
}

/**
 * Get customers
 */
StorageService.prototype.getCustomers = async function () {
    const query = createQuery(1000, undefined, this.filter);
    const { entries } = await queryTable(CUSTOMERS, query);
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
    log('Querying table %s with filter %s', CONFIRMEDTIMEENTRIES, filter);
    let query = createQuery(1000, undefined, filter);
    let result = await queryTableAll(CONFIRMEDTIMEENTRIES, query);
    console.log(result.length);
    if (!options.noParse) {
        result = parseArray(result, res => ({
            ...res,
            customerId: res.projectId.split(' ')[0],
        }), options);
    }
    result = result.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    return result;
}

/**
 * Get users
 */
StorageService.prototype.getUsers = async function () {
    const query = createQuery(1000, undefined).where(this.filter);
    const { entries } = await queryTable(USERS, query);
    return parseArray(entries);
}
/**
 * Get FAQ
 */
StorageService.prototype.getFAQ = async function () {
    const query = createQuery(1000, undefined).where(this.filter);
    const { entries } = await queryTable(FAQ, query);
    return parseArray(entries);
}

module.exports = StorageService;