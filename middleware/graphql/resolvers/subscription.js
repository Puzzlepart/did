const typeDef = `  
    type Subscription {
        id: String
        key: String
        name: String!
    }
`

module.exports = {
    resolvers: {
        Query: {},
        Mutation: {}
    },
    typeDef
}