const _ = require('underscore');
const findBestMatch = require('string-similarity').findBestMatch;
const log = require('debug')('middleware/graphql/resolvers/query/timesheet');
const format = require('string-format');
const { formatDate } = require('../../../../utils');
const get = require('get-value');

const CATEGORY_REGEX = /((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}))/gmi;
const CONTENT_REGEX = /[\(\{\[]((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}?))[\)\]\}]/gmi;

/**
 * Get project best match using string-similarity findBestMatch
 * 
 * @param {*} projects 
 * @param {*} customer 
 * @param {*} projectKey 
 */
function getProjectSuggestion(projects, customer, projectKey) {
    try {
        log('(getProjectSuggestion) Finding best match for [%s]', projectKey);
        let customerProjects = projects.filter(p => p.customerKey === customer.id);
        let projectKeys = customerProjects.map(p => p.id.split(' ')[1]);
        log('(getProjectSuggestion) Finding best matching among [%s] for [%s]', JSON.stringify(projectKeys), projectKey);
        let sm = findBestMatch(projectKey, projectKeys);
        let target = (sm.bestMatch && sm.bestMatch.rating > 0) ? sm.bestMatch.target : null;
        if (!target) return null;
        let suggestion = customerProjects.filter(p => p.id.split(' ')[1] === target.toUpperCase())[0];
        log('(getProjectSuggestion) Project [%s] is best match for [%s]', suggestion.id, projectKey);
        return suggestion;
    } catch (error) {
        log('(getProjectSuggestion) Failed to find best match for [%s]', projectKey);
        return null;
    }
}

/**
 * Find project match in title/subject/categories
 * 
 * @param {*} regex 
 * @param {*} input 
 */
function searchString(regex, input) {
    let matches;
    let match;
    while ((match = regex.exec(input)) != null) {
        matches = matches || [];
        matches.push({
            key: `${match.groups.customerKey} ${match.groups.projectKey}`,
            customerKey: match.groups.customerKey,
            projectKey: match.groups.projectKey,
        });
    }
    return matches;
}

/**
 * Find project match in title/subject/categories
 * 
 * @param {*} content 
 * @param {*} categories 
 */
function findMatches(content, categories) {
    let matches = searchString(CATEGORY_REGEX, categories);
    if (matches) return matches;
    return searchString(CONTENT_REGEX, content);
}

/**
 * Checks for project match in event
 * 
 * @param {*} evt 
 * @param {*} projects 
 * @param {*} customers 
 */
function matchEvent(evt, projects, customers) {
    log('(matchEvent) Finding match for [%s]', evt.title);
    let categories = evt.categories.join(' ').toUpperCase();
    let content = [evt.title, evt.body, categories].join(' ').toUpperCase();
    let matches = findMatches(content, categories);
    let projectKey;
    if (matches) {
        log(`(matchEvent) Found %s matches for [%s]`, matches.length, evt.title);
        for (let i = 0; i < matches.length; i++) {
            let currentMatch = matches[i];
            evt.customer = _.find(customers, c => currentMatch.customerKey === c.id);
            if (evt.customer) {
                evt.project = _.find(projects, p => currentMatch.key === p.id && evt.customer.key === p.customerKey);
                projectKey = currentMatch.projectKey;
            }
            if (evt.project) break;
        }
    } else {
        log('(matchEvent) Found no matching tokens for [%s], looking for non-tokenized matches', evt.title);
        let project = _.find(projects, p => content.indexOf(p.id) !== -1);
        if (project) {
            log('(matchEvent) Found non-tokenized match in event [%s]: [%s]', evt.title, project.id);
            evt.project = project;
            if (evt.project) {
                log('(matchEvent) Setting customer for event [%s] based on non-tokenized match', evt.title, project.id);
                evt.customer = _.find(customers, c => c.key === evt.project.key.split(' ')[0]);
            }
        }
    }
    if (evt.customer && !evt.project) {
        log('(matchEvent) Found match for customer [%s] for [%s], but not for any project', evt.customer.name, evt.title);
        evt.suggestedProject = getProjectSuggestion(projects, evt.customer, projectKey);
    }
    if (evt.project && (get(evt, 'project.inactive') || get(evt, 'customer.inactive'))) {
        if (get(evt, 'project.inactive')) evt.error = { message: format('Project {0} for {1} is no longer active. Please resolve the event in Outlook.', evt.project.name, evt.customer.name) };
        if (get(evt, 'customer.inactive')) evt.error = { message: format('Customer {0} is no longer active. Please resolve the event in Outlook.', evt.customer.name) };
        evt.project = null;
        evt.customer = null;
    }
    return evt;
}


/**
 * Timesheet
 * 
 * @param {*} _obj Unused obj
 * @param {*} args Arguments
 * @param {*} context The context
 */
async function timesheet(_obj, { startDateTime, endDateTime, dateFormat }, context) {
    log('Retrieving events from %s to %s', startDateTime, endDateTime);
    let [projects, customers, confirmedTimeEntries] = await Promise.all([
        context.services.storage.getProjects(),
        context.services.storage.getCustomers(),
        context.services.storage.getConfirmedTimeEntries({ resourceId: context.user.profile.oid, startDateTime, endDateTime }),
    ]);
    projects = projects.map(p => ({ ...p, customer: _.find(customers, c => c.id === p.id.split(' ')[0]) }));
    let events = [];
    let matchedEvents = [];
    let matchedDuration = 0;
    let confirmedDuration = 0;
    if (confirmedTimeEntries.length > 0) {
        log('Found confirmed events from %s to %s, retrieving entries from storage', startDateTime, endDateTime);
        events = confirmedTimeEntries.map(entry => ({
            ...entry,
            project: _.find(projects, p => p.id === entry.projectId),
            customer: _.find(customers, c => c.id === entry.customerId),
        }));
        matchedEvents = events;
        confirmedDuration = events.reduce((sum, evt) => sum + evt.durationMinutes, 0);
        matchedDuration = confirmedDuration;
    } else {
        log('Found no confirmed events from %s to %s, retrieving entries from Microsoft Graph', startDateTime, endDateTime);
        events = await context.services.graph.getEvents(startDateTime, endDateTime, 24);
        events = events.map(evt => matchEvent(evt, projects, customers));
        matchedEvents = events.filter(evt => (evt.project && evt.project.id));
        matchedDuration = matchedEvents.reduce((sum, evt) => sum + evt.durationMinutes, 0);
    }
    events = events.map(evt => ({ ...evt, date: formatDate(evt.startTime, dateFormat) }));
    let totalDuration = events.reduce((sum, evt) => sum + evt.durationMinutes, 0);
    return {
        events,
        totalDuration,
        matchedDuration,
        matchedEvents,
        confirmedDuration,
    };
};

module.exports = timesheet;