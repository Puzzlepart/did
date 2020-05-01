const { resolvers: customerResolvers } = require('./customer');
const { resolvers: projectResolvers } = require('./project');
const { resolvers: timesheetResolvers } = require('./timesheet');
const { resolvers: timeentryResolvers } = require('./timeentry');
const { resolvers: userResolvers } = require('./user');
const { resolvers: outlookCategoryResolvers } = require('./outlookCategory');
const merge = require('lodash').merge;


module.exports = merge(
    customerResolvers,
    projectResolvers,
    timesheetResolvers,
    timeentryResolvers,
    userResolvers,
    outlookCategoryResolvers,
);