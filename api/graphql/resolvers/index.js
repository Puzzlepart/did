const { resolvers: customerResolvers } = require('./customer')
const { resolvers: projectResolvers } = require('./project')
const { resolvers: timesheetResolvers } = require('./timesheet')
const { resolvers: timeentryResolvers } = require('./timeentry')
const { resolvers: userResolvers } = require('./user')
const { resolvers: outlookCategoryResolvers } = require('./outlookCategory')
const { resolvers: labelResolvers } = require('./label')
const { resolvers: roleResolvers } = require('./role')
const { resolvers: notificationResolvers } = require('./notification')
const { resolvers: addApiTokenResolvers } = require('./apiToken')
const { merge } = require('lodash')

module.exports = (isLoggedIn) => {
    return merge(
        customerResolvers,
        projectResolvers,
        timeentryResolvers,
        labelResolvers,
        isLoggedIn && outlookCategoryResolvers,
        isLoggedIn && userResolvers,
        isLoggedIn && roleResolvers,
        isLoggedIn && addApiTokenResolvers,
        isLoggedIn && timesheetResolvers,
        isLoggedIn && notificationResolvers,
    )
}