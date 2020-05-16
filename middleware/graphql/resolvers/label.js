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
        description: String!
        color: String!
        icon: String
    }

    extend type Query {
        labels: [Label!]!
    }  

    extend type Mutation {	
        addLabel(label: LabelInput!): BaseResult   
        updateLabel(label: LabelInput!): BaseResult   
        deleteLabel(id: String!): BaseResult
    }
`

async function labels(_obj, _variables, { services: { storage: StorageService } }) {
    let labels = await StorageService.getLabels()
    return labels
}

async function addLabel(_obj, { label }, { services: { storage: StorageService } }) {
    try {
        await StorageService.addLabel(label, user.profile.oid)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: omit(error, 'requestId') }
    }
}

async function updateLabel(_obj, { label }, { services: { storage: StorageService } }) {
    try {
        await StorageService.updateLabel(label)
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
        Mutation: { addLabel, updateLabel, deleteLabel }
    },
    typeDef
}