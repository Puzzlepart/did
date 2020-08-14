const { startOfYear, endOfYear } = require('../../../utils')

const typeDef = `  
  type VacationStatus {
	registeredHours: Float!
	remainingHours: Float!
	allowedHours: Float!
  }

  extend type Query {
    vacationStatus: VacationStatus!
  }  
`

/**
 * Vacation status
 * 
 * @param {*} _obj Unused obj
 * @param {*} _variables Variables sent by the client
 * @param {*} context The context
 */
async function vacationStatus(_obj, _variables, context) {
    const startDateTime = startOfYear().toISOString()
    const endDateTime = endOfYear().toISOString()
    console.log(startDateTime, endDateTime)
    const events = await context.services.graph.searchEvents('IAM VAC', startDateTime, endDateTime)
    console.log(events.length)
    const allowedHours = 25 * 8
    const registeredHours = events.reduce((sum, evt) => sum + evt.durationHours, 0)
    const remainingHours = allowedHours - registeredHours
    return { registeredHours, remainingHours, allowedHours }
};


module.exports = {
    resolvers: {
        Query: { vacationStatus },
        Mutation: {}
    },
    typeDef
}