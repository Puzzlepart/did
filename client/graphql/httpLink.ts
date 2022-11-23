import { HttpLink } from '@apollo/client'

export default new HttpLink({ uri: `${document.location.origin}/graphql` })