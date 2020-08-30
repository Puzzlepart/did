const { find, pick } = require('underscore')
const jwt = require('jsonwebtoken')

const typeDef = `  
    type ApiToken {
        name: String
        timestamp: String
    } 

    extend type Query {
        getApiTokens: [ApiToken!]!
    }  

    extend type Mutation {
        addApiToken(name: String!): String
        deleteApiToken(name: String): BaseResult
    }
`

async function getApiTokens(_obj, variables, ctx) {
    const tokens = await ctx.services.subscription.getApiTokens(ctx.user.tenantId)
    return tokens
}

async function addApiToken(_obj, variables, ctx) {
    let token = jwt.sign({
        data: pick(ctx.user, 'id', 'tenantId')
    }, process.env.API_TOKEN_SECRET)
    const entry = await ctx.services.subscription.addApiToken(variables.name, ctx.user.tenantId, token)
    return entry ? token : null;
}

async function deleteApiToken(_obj, variables, ctx) {
    try {
        await ctx.services.subscription.deleteApiToken(variables.name, ctx.user.tenantId)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') }
    }
}

module.exports = {
    resolvers: {
        Query: { getApiTokens },
        Mutation: { addApiToken, deleteApiToken }
    },
    typeDef
}