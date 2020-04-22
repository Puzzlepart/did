const log = require('debug')('middleware/graphql/resolvers/query/vacationStatus');
const { startOfYear, endOfYear } = require('../../../../utils');

/**
 * Vacation status
 * 
 * @param {*} _obj Unused obj
 * @param {*} _variables Variables sent by the client
 * @param {*} context The context
 */
async function vacationStatus(_obj, _variables, context) {
    const { VACATION_SEARCH_STRING, VACATION_DAYS } = context.subscription.settings;
    const startDateTime = startOfYear().toISOString();
    const endDateTime = endOfYear().toISOString();
    const events = await context.services.graph.searchEvents(VACATION_SEARCH_STRING, startDateTime, endDateTime);
    const allowedHours = VACATION_DAYS * 8;
    const registeredHours = events.reduce((sum, evt) => sum + evt.durationHours, 0);
    const remainingHours = allowedHours - registeredHours;
    return { registeredHours, remainingHours, allowedHours };
};

module.exports = vacationStatus;