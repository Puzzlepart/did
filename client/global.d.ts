// src/global.d.ts
declare module '*.gql' {
    import { DocumentNode } from 'graphql';

    /**
     * This is a GraphQL query imported from a .gql or .graphql file.
     * 
     * The Apollo extension for VS Code is recommended when working with
     * .gql files.
     * 
     * The extension enables you to:
     * 
     * * Add syntax highlighting for GraphQL files and gql templates inside JavaScript files
     * * Get instant feedback and intelligent autocomplete for fields, arguments, types, and variables as you write queries
     * * Manage client side schema alongside remote schema
     * * See performance information inline with your query definitions
     * * Validate field and argument usage in operations
     * * Navigate projects more easily with jump-to and peek-at definitions
     * * Manage client-only schemas
     * * Switch graph variants to work with schemas running on different environments
     * 
     * @see https://www.apollographql.com/docs/devtools/editor-plugins/
     */
    const value: DocumentNode;
    export = value;
}