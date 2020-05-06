const typeDef = `  
    type User {
        id: String
        key: String
        role: String!
        fullName: String!
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
        updateUser(user: UserInput!): BaseResult!
        addUser(user: UserInput!): BaseResult!
    }
`;

async function users(_obj, _args,  { services: { storage: StorageService } }) {
    let users = await StorageService.getUsers();
    return users;
}

async function currentUser(_obj, _args, { user, services: { storage: StorageService } }) {
    const currentUser = await StorageService.getUser(user.profile.oid);
    const sub = await StorageService.getSubscription();
    return { ...currentUser, sub };
}

async function addUser(_obj, variables,  { services: { storage: StorageService } }) {
    try {
        await StorageService.addUser(variables.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

async function updateUser(_obj, variables, { services: { storage: StorageService } }) {
    try {
        await StorageService.updateUser(variables.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = {
    resolvers: {
        Query: { users, currentUser },
        Mutation: { addUser, updateUser }
    },
    typeDef
}