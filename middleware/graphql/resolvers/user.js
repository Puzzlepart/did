const { find } = require('underscore')

const typeDef = `  
    type User {
        id: String
        role: Role
        fullName: String
        email: String
        userLanguage: String
        userTheme: String
        sub: Subscription
    }
    
    input UserInput  {
        id: String!
        fullName: String
        role: String
        userLanguage: String
        userTheme: String
    }
    
    extend type Query {    
        users: [User!]!
        currentUser: User!
    }  

    extend type Mutation {
        updateUser(user: UserInput!): BaseResult!
        addUser(user: UserInput!): BaseResult!
    }
`

async function users(_obj, _args, { services: { storage: StorageService } }) {
    let [users, roles] = await Promise.all([
        StorageService.getUsers(),
        StorageService.getRoles()
    ])
    users = users.map(user => ({
        ...user,
        role: find(roles, role => role.name === user.role)
    })).filter(user => user.role)
    return users
}

async function currentUser(_obj, _args, { user: { id, tenantId, profile }, services: { subscription: SubscriptionService, storage: StorageService } }) {
    const [user, sub, roles] = await Promise.all([
        StorageService.getUser(id),
        SubscriptionService.getSubscription(tenantId),
        StorageService.getRoles()
    ])
    return {
        ...user,
        email: profile.email,
        sub,
        role: find(roles, role => role.name === user.role),
    }
}

async function addUser(_obj, variables, { services: { storage: StorageService } }) {
    try {
        await StorageService.addUser(variables.user)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') }
    }
}

async function updateUser(_obj, variables, { services: { storage: StorageService } }) {
    try {
        await StorageService.updateUser(variables.user)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') }
    }
}

module.exports = {
    resolvers: {
        Query: { users, currentUser },
        Mutation: { addUser, updateUser }
    },
    typeDef
}