const { queryTable, parseArray } = require('../../../services/table');
const { TableQuery } = require('azure-storage');
const graph = require('../../../services/graph');
const utils = require('../../../utils');

/**
 * Checks for project match in event
 * 
 * @param {*} event 
 * @param {*} projectKey 
 */
function matchProject(event, projectKey) {
    return event.subject.toUpperCase().indexOf(projectKey.toUpperCase()) !== -1
        || event.body.toUpperCase().indexOf(projectKey.toUpperCase()) !== -1
        || JSON.stringify(event.categories).toUpperCase().indexOf(projectKey) !== -1
}

module.exports = async (_obj, args, context) => {
    if (!context.isAuthenticated) return [];
    const calendarView = await graph.getCalendarView(context.user.oauthToken.access_token, args.weekNumber);
    const result = await queryTable(process.env.AZURE_STORAGE_PROJECTS_TABLE_NAME, new TableQuery().top(1000).where('PartitionKey eq ?', context.user.profile._json.tid).select('CustomerKey', 'ProjectKey', 'Name'));
    const projects = parseArray(result).map(r => ({ ...r, key: `${r.customerKey} ${r.projectKey}` }));
    const events = calendarView
        .map(event => {
            let duration = utils.getDurationMinutes(event.startTime, event.endTime);
            let project = projects.filter(p => matchProject(event, p.key))[0];
            return {
                id: event.id,
                subject: event.subject,
                webLink: event.webLink,
                startTime: event.startTime,
                endTime: event.endTime,
                duration: duration,
                project: project,
            };
        });
    return events;
};