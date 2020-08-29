const { find } = require('underscore')
const jwt = require('jsonwebtoken');

const typeDef = `
    extend type Mutation {
        addApiToken: String
    }
`

async function addApiToken(_obj, _variables, ctx) {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: ctx.user.tenantId
    }, process.env.API_TOKEN_SECRET)
    const entry = await ctx.services.subscription.addApiToken(ctx.user.tenantId, token)
    return entry ? token : null;
}

module.exports = {
    resolvers: {
        Query: {},
        Mutation: { addApiToken }
    },
    typeDef
}