import _ from 'underscore';
const { findBestMatch } = require('string-similarity');
const debug = require('debug')('middleware/graphql/resolvers/query/timesheet.matching');
const format = require('string-format');
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
        debug('(getProjectSuggestion) Finding best match for [%s]', projectKey);
        let customerProjects = projects.filter(p => p.customerKey === customer.id);
        let projectKeys = customerProjects.map(p => p.id.split(' ')[1]);
        debug('(getProjectSuggestion) Finding best matching among [%s] for [%s]', JSON.stringify(projectKeys), projectKey);
        let sm = findBestMatch(projectKey, projectKeys);
        let target = (sm.bestMatch && sm.bestMatch.rating > 0) ? sm.bestMatch.target : null;
        if (!target) return null;
        let suggestion = customerProjects.filter(p => p.id.split(' ')[1] === target.toUpperCase())[0];
        debug('(getProjectSuggestion) Project [%s] is best match for [%s]', suggestion.id, projectKey);
        return suggestion;
    } catch (error) {
        debug('(getProjectSuggestion) Failed to find best match for [%s]', projectKey);
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
 * @param {string} content 
 * @param {string} categoriesStr 
 */
function findMatches(content: string, categoriesStr: string) {
    let matches = searchString(CATEGORY_REGEX, categoriesStr);
    if (matches) return matches;
    return searchString(CONTENT_REGEX, content);
}

/**
 * Checks for project match in event
 * 
 * @param {any} evt 
 * @param {any[]} projects 
 * @param {any[]} customers 
 */
function matchEvent(evt: any, projects: any[], customers: any[]) {
    debug('(matchEvent) Finding match for [%s]', evt.title);
    let categories = evt.categories.join(' ').toUpperCase();
    let content = [evt.title, evt.body, categories].join(' ').toUpperCase();
    let matches = findMatches(content, categories);
    let projectKey: string;
    if (matches) {
        debug(`(matchEvent) Found %s matches for [%s]`, matches.length, evt.title);
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
        debug('(matchEvent) Found no matching tokens for [%s], looking for non-tokenized matches', evt.title);
        let project = _.find(projects, p => content.indexOf(p.id) !== -1);
        if (project) {
            debug('(matchEvent) Found non-tokenized match in event [%s]: [%s]', evt.title, project.id);
            evt.project = project;
            if (evt.project) {
                debug('(matchEvent) Setting customer for event [%s] based on non-tokenized match', evt.title, project.id);
                evt.customer = _.find(customers, c => c.key === evt.project.key.split(' ')[0]);
            }
        }
    }
    if (evt.customer && !evt.project) {
        debug('(matchEvent) Found match for customer [%s] for [%s], but not for any project', evt.customer.name, evt.title);
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
 * Matches events against projects/customers
 * 
 * @param {*} events 
 * @param {*} projects 
 * @param {*} customers 
 */
export default function matchEvents(events, projects, customers) {
    return events.map(evt => matchEvent(evt, projects, customers));
}