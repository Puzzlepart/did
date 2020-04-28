const log = require('debug')('middleware/graphql/resolvers/query/notifications');

const NOTIFICATION_TYPE = {
    WEEK_NOT_CONFIRMED: 0,
    SERVICE_ANNOUNCEMENT: 1,
    FEATURE_ANNOUNCEMENT: 2,
}


const NOTIFICATION_SEVERITY = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
}

const PLACEHOLDER_NOTIFICATIONS = [
    {
        type: NOTIFICATION_TYPE.WEEK_NOT_CONFIRMED,
        text: 'You have not confirmed week 13.',
        severity: NOTIFICATION_SEVERITY.HIGH,
        moreLink: '#',
    },
    {
        type: NOTIFICATION_TYPE.WEEK_NOT_CONFIRMED,
        text: 'You have not confirmed week 12.',
        severity: NOTIFICATION_SEVERITY.HIGH,
        moreLink: '#',
    },
    {
        id: '2bae37fe-a558-445a-b202-36e5723aea2c',
        type: NOTIFICATION_TYPE.SERVICE_ANNOUNCEMENT,
        text: 'Did 365 will be down for maintenance today from 16:00 to 19:00.',
        severity: NOTIFICATION_SEVERITY.HIGH,
    },
    {
        id: '2bae37fe-a558-445a-b202-36e5723aea2c',
        type: NOTIFICATION_TYPE.FEATURE_ANNOUNCEMENT,
        text: 'We\'ve just relased a bunch of new features!',
        severity: NOTIFICATION_SEVERITY.HIGH,
    }
];

/**
 * Get notifications
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function notifications(_obj, _args, context) {
    log('Returning placeholder notifications');
    return PLACEHOLDER_NOTIFICATIONS;
}

module.exports = notifications;