const { pick } = require('underscore')

const typeDef = `   
    type Role  {
        name: String!
        permissions: [String]!
    }
      
    input RoleInput  {
        id: String
        name: String!
        permissions: [String]!
    }

    extend type Query {
        roles: [Role!]!
    }  

    extend type Mutation {
        addOrUpdateRole(role: RoleInput!, update: Boolean): BaseResult
    }
`

async function roles(_obj, _variables, ctx) {
    let roles = await ctx.services.storage.getRoles()
    return roles
}

async function addOrUpdateRole(_obj, variables, ctx) {
    try {
        await ctx.services.storage.addRole(variables.role, variables.update)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

module.exports = {
    resolvers: {
        Query: { roles },
        Mutation: { addOrUpdateRole }
    },
    typeDef
}