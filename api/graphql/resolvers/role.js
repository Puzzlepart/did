const { pick } = require('underscore')

const typeDef = `   
    type Role  {
        id: String
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
        addRole(role: RoleInput!): BaseResult
        updateRole(role: RoleInput!): BaseResult
    }
`

async function roles(_obj, _variables, ctx) {
    let roles = await ctx.services.storage.getRoles()
    return roles
}

async function addRole(_obj, variables, ctx) {
    try {
        await ctx.services.storage.addRole(variables.role)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

async function updateRole(_obj, variables, ctx) {
    try {
        await ctx.services.storage.updateRole(variables.role)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

module.exports = {
    resolvers: {
        Query: { roles },
        Mutation: { addRole, updateRole }
    },
    typeDef
}