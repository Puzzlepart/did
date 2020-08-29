const { find } = require('underscore')
const jwt = require('jsonwebtoken');

const typeDef = `
    extend type Mutation {
        addApiKey: String
    }
`

async function addApiKey(_obj, _variables, ctx) {
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
    }, 'secret')
    const entry = await ctx.services.subscription.addApiToken(ctx.user.tenantId, token)
    return entry ? token : null;
}

module.exports = {
    resolvers: {
        Query: {},
        Mutation: { addApiKey }
    },
    typeDef
}