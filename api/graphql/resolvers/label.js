const { pick } = require('underscore')

const typeDef = `   
    type Label  {
        name: String!
        description: String
        color: String!
        icon: String
    }
    
    input LabelInput  {
        name: String!
        description: String
        color: String!
        icon: String
    }

    extend type Query {
        labels: [Label!]!
    }  

    extend type Mutation {	
        addOrUpdateLabel(label: LabelInput!, update: Boolean): BaseResult    
        deleteLabel(name: String!): BaseResult
    }
`

async function labels(_obj, _variables, ctx) {
    let labels = await ctx.services.storage.getLabels()
    return labels
}

async function addOrUpdateLabel(_obj, variables, ctx) {
    try {
        await ctx.services.storage.addOrUpdateLabel(variables.label, ctx.user.id, variables.update)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

async function updateLabel(_obj, variables, ctx) {
    try {
        await ctx.services.storage.updateLabel(variables.label)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

async function deleteLabel(_obj, variables, ctx) {
    try {
        await ctx.services.storage.deleteLabel(variables.name)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

module.exports = {
    resolvers: {
        Query: { labels },
        Mutation: { addOrUpdateLabel, deleteLabel }
    },
    typeDef
}