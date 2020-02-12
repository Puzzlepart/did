const _ = require('underscore');
const findBestMatch = require('string-similarity').findBestMatch;
const log = require('debug')('middleware/graphql/resolvers/query/eventData');

/**
 * Get project best match
 * 
 * @param {*} projects 
 * @param {*} customer 
 * @param {*} projectKey 
 */
function getProjectSuggestion(projects, customer, projectKey) {
    try {
        log('(getProjectSuggestion) Finding best match for [%s]', projectKey);
        let customerProjects = projects.filter(p => p.customerKey === customer.id);
        log('(getProjectSuggestion) Found [%s] projects for customer [%s]', customer.id);
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
 * @param {*} content 
 * @param {*} categories 
 */
function findMatch(content, categories) {
    let regex = /((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}))/gm;
    let match = regex.exec(categories);
    if (match && match.groups) return match.groups;
    regex = /[\(\{\[]((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}?))[\)\]\}]/gm;
    match = regex.exec(content);
    if (match && match.groups) return match.groups;
    return null;
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
    let projectId;
    let match = findMatch(content, categories);
    if (match) {
        projectId = `${match.customerKey} ${match.projectKey}`;
        log('(matchEvent) Found match for [%s]: %s', evt.title, projectId);
        evt.project = _.find(projects, p => p.id === projectId);
        evt.customer = _.find(customers, c => c.id === match.customerKey);
    } else {
        log('(matchEvent) Found no matching tokens for [%s], looking for non-tokenized matches', evt.title);
        let project = projects.filter(p => content.indexOf(p.id) !== -1)[0];
        if (project) {
            log('(matchEvent) Found non-tokenized match in event [%s]: [%s]', evt.title, project.id);
            evt.project = project;
            if (evt.project) {
                log('(matchEvent) Setting customer for event [%s] based on non-tokenized match', evt.title, project.id);
                evt.customer = customers.filter(c => c.key === evt.project.key.split(' ')[0])[0];
            }
        }
        match = {};
    }
    if (evt.customer && !evt.project) {
        log('(matchEvent) Found match for customer [%s] for [%s], but not for any project', evt.customer.name, evt.title);
        let suggestedProject = getProjectSuggestion(projects, evt.customer, match.projectKey);
        if (suggestedProject) evt.suggestedProject = suggestedProject;
    }
    return {
        ...evt,
        ...match,
        overtime: categories.indexOf('OVERTIME') !== -1,
    };
}


/**
 * Event data
 * 
 * @param {*} _obj Unused obj
 * @param {*} args Arguments
 * @param {*} context The context
 */
async function eventData(_obj, { startDateTime, endDateTime }, context) {
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
        events = await context.services.graph.getEvents(startDateTime, endDateTime);
        events = events.map(evt => matchEvent(evt, projects, customers));
        matchedEvents = events.filter(evt => (evt.project && evt.project.id));
        matchedDuration = matchedEvents.reduce((sum, evt) => sum + evt.durationMinutes, 0);
    }
    return {
        events,
        totalDuration: events.reduce((sum, evt) => sum + evt.durationMinutes, 0),
        matchedDuration,
        matchedEvents,
        confirmedDuration,
    };
};

module.exports = eventData;