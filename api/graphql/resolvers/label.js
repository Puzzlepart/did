const { omit } = require('underscore')

const typeDef = `   
    type Label  {
        id: String
        name: String!
        description: String
        color: String!
        icon: String
    }
    
    input LabelInput  {
        id: String
        name: String!
        description: String
        color: String!
        icon: String
    }

    extend type Query {
        labels: [Label!]!
    }  

    extend type Mutation {	
        addOrUpdateLabel(label: LabelInput!): BaseResult    
        deleteLabel(id: String!): BaseResult
    }
`

async function labels(_obj, _variables, ctx) {
    let labels = await ctx.services.storage.getLabels()
    return labels
}

async function addOrUpdateLabel(_obj, variables, ctx) {
    try {
        await ctx.services.storage.addOrUpdateLabel(variables.label, ctx.user.id)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: omit(error, 'requestId') }
    }
}

async function updateLabel(_obj, variables, ctx) {
    try {
        await ctx.services.storage.updateLabel(variables.label)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: omit(error, 'requestId') }
    }
}

async function deleteLabel(_obj, { id }, { services: { storage: StorageService } }) {
    try {
        await StorageService.deleteLabel(id)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error }
    }
}

module.exports = {
    resolvers: {
        Query: { labels },
        Mutation: { addOrUpdateLabel, deleteLabel }
    },
    typeDef
}