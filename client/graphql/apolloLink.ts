import { ApolloLink } from '@apollo/client'

export default new ApolloLink((operation, forward) => {
    operation.setContext(() => ({
        uri: `${document.location.origin}/graphql?${operation.operationName}`,
    }))
    return forward ? forward(operation) : null
})