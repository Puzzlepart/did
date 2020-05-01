import _ from 'underscore';
import { IGraphQLContext } from '../..';
import { utils } from '../../../../utils';
import {matchEvents} from './timesheet.matching';
const debug = require('debug')('middleware/graphql/resolvers/query/timesheet');

/**
 * Timesheet
 * 
 * @param {any} _obj Unused obj
 * @param {any} variables Variables sent by the client
 * @param {IGraphQLContext} context The context
 */
export default async function timesheet(_obj: any, variables: any, context: IGraphQLContext) {
    debug('Retrieving events from %s to %s', variables.startDateTime, variables.endDateTime);
    const week = utils.getWeek(variables.startDateTime);
    const startMonthIdx = utils.getMonthIndex(variables.startDateTime);
    const endMonthIdx = utils.getMonthIndex(variables.endDateTime);
    const isSplit = endMonthIdx !== startMonthIdx;

    let periods: any[] = [{
        id: `${week}_${startMonthIdx}`,
        name: `Week ${week}`,
        startDateTime: variables.startDateTime,
        endDateTime: isSplit
            ? utils.endOfMonth(variables.startDateTime).toISOString()
            : variables.endDateTime,
    }];

    if (isSplit) {
        periods.push({
            id: `${week}_${endMonthIdx}`,
            startDateTime: utils.startOfMonth(variables.endDateTime).toISOString(),
            endDateTime: variables.endDateTime,
        });
        periods = periods.map(period => ({ ...period, name: `Week ${week} (${utils.formatDate(period.startDateTime, 'MMMM')})` }))
    }

    let [projects, customers, confirmedTimeEntries] = await Promise.all([
        context.services.storage.getProjects(),
        context.services.storage.getCustomers(),
        context.services.storage.getConfirmedTimeEntries({
            resourceId: context.user.profile.oid,
            startDateTime: variables.startDateTime,
            endDateTime: variables.endDateTime,
        }),
    ]);

    projects = projects
        .map(p => ({
            ...p,
            customer: _.find(customers, c => c.id.toUpperCase() === p.customerKey.toUpperCase())
        }))
        .filter(p => p.customer);

    for (let i = 0; i < periods.length; i++) {
        let period = periods[i];
        debug('Processing period %s (%s - %s)', period.id, period.startDateTime, period.endDateTime);
        period.confirmedDuration = 0;
        const entries = [...confirmedTimeEntries].filter(entry => `${entry.weekNumber}_${entry.monthNumber}` === period.id);
        const isConfirmed = entries.length > 0;
        if (isConfirmed) {
            debug('Found %s confirmed events from %s to %s, retrieving entries from storage', entries.length, period.startDateTime, period.endDateTime);
            period.events = entries.map(entry => ({
                ...entry,
                project: _.find(projects, p => p.id === entry.projectId),
                customer: _.find(customers, c => c.id === entry.customerId),
            }));
            period.matchedEvents = period.events;
            period.confirmedDuration = period.events.reduce((sum, evt) => sum + evt.durationMinutes, 0);
        } else {
            debug('Found no confirmed events from %s to %s, retrieving entries from Microsoft Graph (me/calendar/calendarView)', period.startDateTime, period.endDateTime);
            period.events = await context.services.graph.getEvents(period.startDateTime, period.endDateTime);
            debug('Found %s events from %s to %s', period.events.length, period.startDateTime, period.endDateTime);
            period.events = matchEvents(period.events, projects, customers);
            period.matchedEvents = period.events.filter(evt => evt.project);
        }
        period.events = period.events.map(evt => ({ ...evt, date:utils.formatDate(evt.startTime, variables.dateFormat) }));
    }
    return periods;
};