const { queryTable, parseArray, isEqual, and, combine, stringFilter, intFilter, createQuery, addEntity, entGen } = require('../utils/table');
const log = require('debug')('services/storage');
const arraySort = require('array-sort');

const SUBSCRIPTIONS = process.env.AZURE_STORAGE_SUBSCRIPTIONS_TABLE_NAME;
const USERS = process.env.AZURE_STORAGE_USERS_TABLE_NAME;
const PROJECTS = process.env.AZURE_STORAGE_PROJECTS_TABLE_NAME;
const CUSTOMERS = process.env.AZURE_STORAGE_CUSTOMERS_TABLE_NAME;
const CONFIRMEDTIMEENTRIES = process.env.AZURE_STORAGE_CONFIRMEDTIMEENTRIES_TABLE_NAME;

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
        var sub = await queryTable(SUBSCRIPTIONS, query);
        resolve(parseArray(sub)[0]);
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
    const users = await queryTable(USERS, query);
    return parseArray(users)[0];
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
    let query = createQuery(1000, ['RowKey', 'CustomerKey', 'ProjectKey', 'Name', 'Description', 'Icon'], filter);
    const result = await queryTable(PROJECTS, query);
    let projects = parseArray(result).map(r => {
        let customerKey = r.customerKey.toUpperCase();
        let projectKey = r.projectKey.toUpperCase();
        return {
            ...r,
            customerKey,
            projectKey,
            key: [customerKey, projectKey].join(' '),
        }
    });
    if (sortBy) projects = arraySort(projects, sortBy);
    return projects;
}

/**
 * Create project
 * 
 * @param {*} customerKey 
 * @param {*} projectKey 
 * @param {*} name 
 */
StorageService.prototype.createProject = async function (customerKey, projectKey, name) {
    let entity = await addEntity(PROJECTS, {
        PartitionKey: entGen.String(this.tenantId),
        RowKey: entGen.String(require('uuid/v1')()),
        Name: entGen.String(name),
        CustomerKey: entGen.String(customerKey.toUpperCase()),
        ProjectKey: entGen.String(projectKey.toUpperCase()),
    })
    return entity;
}

StorageService.prototype.getCustomers = async function () {
    const query = createQuery(1000, ['RowKey', 'CustomerKey', 'Name', 'Description', 'WebLink']).where(this.filter);
    const result = await queryTable(CUSTOMERS, query);
    return parseArray(result).map(r => {
        let customerKey = r.customerKey.toUpperCase();
        return {
            ...r,
            key: customerKey,
            customerKey,
        }
    });;
}


StorageService.prototype.getConfirmedTimeEntries = async function (resourceId, weekNumber, projectKey, options) {
    options = options || {};
    let filter = this.filter;
    if (projectKey) {
        let key = projectKey.split(' ');
        filter = combine(filter, and, combine(stringFilter('CustomerKey', isEqual, key[0]), and, stringFilter('ProjectKey', isEqual, key[1])));
    }
    if (resourceId) filter = combine(filter, and, stringFilter('ResourceId', isEqual, resourceId));
    if (weekNumber) filter = combine(filter, and, intFilter('WeekNumber', isEqual, weekNumber));
    log('Querying table %s wit filter %s', CONFIRMEDTIMEENTRIES, filter);
    let query = createQuery(1000, null, filter);
    let result = await queryTable(CONFIRMEDTIMEENTRIES, query);
    result = !options.noParse ? parseArray(result) : result;
    result = result.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    return result;
};

module.exports = StorageService;