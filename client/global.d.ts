declare module '*.scss'

declare module '*.gql' {
    import { DocumentNode } from 'graphql';

    /**
     * This is a GraphQL query imported from a .gql or .graphql file.
     * 
     * @see https://www.apollographql.com/docs/devtools/editor-plugins/
     */
    const value: DocumentNode;
    export = value;
}
