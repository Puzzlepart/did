const { pick, find, filter } = require('underscore')

const typeDef = `  
    type Subscription {
        name: String!
    }

    type User {
        id: String
        role: Role
        fullName: String
        email: String
        userLanguage: String
        sub: Subscription
    }
    
    input UserInput  {
        id: String!
        fullName: String
        role: String
        userLanguage: String
    }
    
    extend type Query {    
        users: [User!]!
        currentUser: User!
    }  

    extend type Mutation {
        addOrUpdateUser(user: UserInput!): BaseResult!
    }
`

async function users(_obj, _variables, ctx) {
    let [users, roles] = await Promise.all([
        ctx.services.storage.getUsers(),
        ctx.services.storage.getRoles()
    ])
    users = filter(users.map(user => ({
        ...user,
        role: find(roles, role => role.name === user.role)
    })), user => !!user.role)
    return users
}

async function currentUser(_obj, _variables, ctx) {
    try {
        const [user, sub, roles] = await Promise.all([
            ctx.services.storage.getUser(ctx.user.id),
            ctx.services.subscription.getSubscription(ctx.user.tenantId),
            ctx.services.storage.getRoles()
        ])
        return {
            ...user,
            email: ctx.user.profile.email,
            sub,
            role: find(roles, role => role.name === user.role),
        }
    } catch (error) {

    }
}

async function addOrUpdateUser(_obj, variables, ctx) {
    try {
        await ctx.services.storage.addOrUpdateUser(variables.user)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: pick(error, 'name', 'message', 'code', 'statusCode') }
    }
}

module.exports = {
    resolvers: {
        Query: { users, currentUser },
        Mutation: { addOrUpdateUser }
    },
    typeDef
}