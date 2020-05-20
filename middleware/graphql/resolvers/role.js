const { omit } = require('underscore')

const typeDef = `   
    type Role  {
        id: String
        name: String!
        permissions: [String]!
    }

    extend type Query {
        roles: [Role!]!
    }  
`

async function roles(_obj, _variables, { services: { storage: StorageService } }) {
    let roles = await StorageService.getRoles()
    roles = roles.map(r => ({
        ...r,
        permissions: (r.permissions || '').split('|').filter(p => p),
    }))
    return roles
}
module.exports = {
    resolvers: {
        Query: { roles },
        Mutation: {}
    },
    typeDef
}