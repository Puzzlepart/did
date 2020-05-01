const typeDef = `  
    type User {
        id: String
        key: String
        role: String!
        fullName: String!
    }

    
    input UserInput  {
        id: String!
        fullName: String!
        role: String!
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

async function users(_obj, _args, context) {
    let users = await context.services.storage.getUsers();
    return users;
}

async function currentUser(_obj, _args, context) {
    let user = await context.services.storage.getUser(context.user.profile.oid);
    return user;
}

async function addUser(_obj, variables, context) {
    try {
        await context.services.storage.addUser(variables.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

async function updateUser(_obj, variables, context) {
    try {
        await context.services.storage.updateUser(variables.user);
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