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

/**
 * The current version of the application. Made available by 
 * the webpack `DefinePlugin`.
 */
declare const VERSION: string

/**
 * The current commit hash of the application. Made available by 
 * the webpack `DefinePlugin`.
 */
declare const COMMIT_HASH: string

/**
 * The current branch of the application. Made available by 
 * the webpack `DefinePlugin`.
 */
declare const BRANCH: string

/**
 * The last commit date and time of the application. Made available by 
 * the webpack `DefinePlugin`.
 */
declare const LAST_COMMIT_DATETIME: string


/**
 * URL to the current commit of the application. Made available by
 * the webpack `DefinePlugin`.
 */
declare const COMMIT_URL: string

/**
 * URL to the current branch of the application. Made available by
 * the webpack `DefinePlugin`.
 */
declare const BRANCH_URL: string


/**
 * Display version details in the UI. Made available by
 * the webpack `DefinePlugin`. Might use type `boolean` instead,
 * but for now it's a string.
 */
declare const DISPLAY_VERSION_DETAILS: string