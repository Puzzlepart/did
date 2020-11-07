// src/global.d.ts
declare module '*.gql' {
    import { DocumentNode } from 'graphql';

    /**
     * This is a GraphQL query imported from a .gql or .graphql file
     */
    const value: DocumentNode;
    export = value;
}