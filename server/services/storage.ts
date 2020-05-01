import { TableUtilities, TableQuery } from 'azure-storage';
import { utils } from '../utils';
import _ from 'underscore';
import { IGetConfirmedTimeEntriesFilters, IEntityOptions } from './storage.types';

class StorageService {
    tenantId: any;
    filter: any;

    /**
     * Constructs a new StorageService
     * 
     * @param {string} tid 
     */
    constructor(tid: string) {
        this.tenantId = tid;
        this.filter = TableQuery.stringFilter('PartitionKey', TableUtilities.QueryComparisons.EQUAL, this.tenantId);
    }

    /**
     * Checks if the tenant id has a active subscription
     */
    getSubscription(): Promise<any> {
        return new Promise(async (resolve) => {
            const query = utils.table.createQuery(1, ['Name']).where('RowKey eq ?', this.tenantId);
            var { entries } = await utils.table.queryTable('Subscriptions', query);
            resolve(utils.table.parseEntities(entries)[0]);
        });
    }

    /**
     * Get weeks
     */
    async getWeeks() {
        let query = utils.table.createQuery(1000, undefined, this.filter);
        const { entries } = await utils.table.queryTable('Weeks', query);
        const weeks = utils.table.parseEntities(entries);
        return weeks;
    }
    /**
     * Update week
     * 
     * @param {number} weekNumber
     * @param {boolean} closed
     */
    async updateWeek(weekNumber: number, closed: boolean) {
        const result = await utils.table.updateEntity('Weeks', {
            PartitionKey: TableUtilities.entityGenerator.String(this.tenantId),
            RowKey: TableUtilities.entityGenerator.String(weekNumber.toString()),
            Closed: TableUtilities.entityGenerator.Boolean(closed),
        });
        return result;
    }
    /**
     * Update user
     * 
     * @param {any} model
     */
    async updateUser(model: any) {
        const result = await utils.table.updateEntity('Users', {
            PartitionKey: TableUtilities.entityGenerator.String(this.tenantId),
            RowKey: TableUtilities.entityGenerator.String(model.id),
            FullName: TableUtilities.entityGenerator.String(model.fullName),
            Role: TableUtilities.entityGenerator.String(model.role),
        });
        return result;
    }
    /**
     * Create project
     *
     * @param {any} model
     * @param {string} createdBy
     */
    async createProject(model: any, createdBy: string) {
        let projectId = (`${model.customerKey} ${model.projectKey}`).toUpperCase();
        let entity = await utils.table.addEntity('Projects', {
            PartitionKey: TableUtilities.entityGenerator.String(this.tenantId),
            RowKey: TableUtilities.entityGenerator.String(projectId),
            Name: TableUtilities.entityGenerator.String(model.name),
            Description: TableUtilities.entityGenerator.String(model.description),
            CustomerKey: TableUtilities.entityGenerator.String(model.customerKey.toUpperCase()),
            Icon: TableUtilities.entityGenerator.String(model.icon || 'Page'),
            CreatedBy: TableUtilities.entityGenerator.String(createdBy),
        });
        return entity;
    }
    /**
     * Create customer
     *
     * @param {any} model
     * @param {string} createdBy
     */
    // TODO: Share ICustomer interface with client
    async createCustomer(model: any, createdBy: string) {
        let entity = await utils.table.addEntity('Customers', {
            PartitionKey: TableUtilities.entityGenerator.String(this.tenantId),
            RowKey: TableUtilities.entityGenerator.String(model.key.toUpperCase()),
            Name: TableUtilities.entityGenerator.String(model.name),
            Description: TableUtilities.entityGenerator.String(model.description),
            Icon: TableUtilities.entityGenerator.String(model.icon || 'Page'),
            CreatedBy: TableUtilities.entityGenerator.String(createdBy),
        });
        return entity;
    }
    /**
     * Add user
     *
     * @param {any} model
     */
    async addUser(model: any) {
        let entity = await utils.table.addEntity('Users', {
            PartitionKey: TableUtilities.entityGenerator.String(this.tenantId),
            RowKey: TableUtilities.entityGenerator.String(model.id),
            FullName: TableUtilities.entityGenerator.String(model.fullName),
            Role: TableUtilities.entityGenerator.String(model.role),
        });
        return entity;
    }
    /**
     * Get customers
     */
    async getCustomers() {
        const query = utils.table.createQuery(1000, undefined, this.filter);
        const { entries } = await utils.table.queryTable('Customers', query);
        return utils.table.parseEntities(entries, undefined, { idUpper: true });
    }
    /**
     * Get projects
     *
     * @param {string} customerKey
     * @param {IEntityOptions} options
     */
    async getProjects(customerKey?: string, options: IEntityOptions = {}) {
        let filter = this.filter;
        if (customerKey)
            filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('CustomerKey', TableUtilities.QueryComparisons.EQUAL, customerKey));
        let query = utils.table.createQuery(1000, undefined, filter);
        let { entries } = await utils.table.queryTable('Projects', query);
        if (!options.noParse)
            entries = utils.table.parseEntities(entries, undefined, { idUpper: true });
        if (options.sortBy)
            entries = _.sortBy(entries, options.sortBy)

        return entries;
    }
    /**
     * Get confirmed time entries
     *
     * @param {IGetConfirmedTimeEntriesFilters} filters
     * @param {IEntityOptions} options
     */
    async getConfirmedTimeEntries(filters: IGetConfirmedTimeEntriesFilters = {}, options: IEntityOptions = {}) {
        let filter = this.filter;
        if (filters.projectId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ProjectId', TableUtilities.QueryComparisons.EQUAL, filters.projectId));
        if (filters.resourceId) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.stringFilter('ResourceId', TableUtilities.QueryComparisons.EQUAL, filters.resourceId));
        if (filters.weekNumber) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('WeekNumber', TableUtilities.QueryComparisons.EQUAL, filters.weekNumber));
        if (filters.yearNumber) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.int32Filter('YearNumber', TableUtilities.QueryComparisons.EQUAL, filters.yearNumber));
        if (filters.startDateTime) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.dateFilter('StartTime', TableUtilities.QueryComparisons.GREATER_THAN, TableUtilities.entityGenerator.DateTime(new Date(filters.startDateTime))._));
        if (filters.endDateTime) filter = TableQuery.combineFilters(filter, TableUtilities.TableOperators.AND, TableQuery.dateFilter('StartTime', TableUtilities.QueryComparisons.LESS_THAN, TableUtilities.entityGenerator.DateTime(new Date(filters.endDateTime))._));
        let query = utils.table.createQuery(1000, undefined, filter);
        let result = await utils.table.queryTableAll('ConfirmedTimeEntries', query);
        if (!options.noParse) {
            result = utils.table.parseEntities(result, res => ({ ...res, customerId: res.projectId.split(' ')[0], }), options);
        }
        result = result.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        return result;
    }
    /**
     * Get users
     */
    async getUsers() {
        const query = utils.table.createQuery(1000, undefined).where(this.filter);
        const { entries } = await utils.table.queryTable('Users', query);
        return utils.table.parseEntities(entries);
    }
    /**
     * Get current user
     *
     * @param {string} userId
     */
    async getUser(userId: string) {
        const entry = await utils.table.retrieveEntity('Users', this.tenantId, userId);
        return utils.table.parseEntities([entry])[0];
    }
    /**
     * Delete customer
     *
     * @param {string} key
     */
    async deleteCustomer(key: string) {
        try {
            const result = await utils.table.deleteEntity('Customers', {
                PartitionKey: TableUtilities.entityGenerator.String(this.tenantId),
                RowKey: TableUtilities.entityGenerator.String(key),
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
            const result = await utils.table.deleteEntity('Projects', {
                PartitionKey: TableUtilities.entityGenerator.String(this.tenantId),
                RowKey: TableUtilities.entityGenerator.String(key),
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}

export { StorageService }