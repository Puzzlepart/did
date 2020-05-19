const typeDef = `  
    type Subscription {
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