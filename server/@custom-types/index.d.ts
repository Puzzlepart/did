export interface Subscription {
    partitionKey: string;
    id: string;
    timestamp: Date;
    connectionString: string;
    name: string;
    settings: any;
}

export interface TokenParams {
    token_type: string;
    scope: string;
    expires_in: number;
    ext_expires_in: number;
    access_token: string;
    refresh_token: string;
    id_token: string;
}

declare namespace Express {
    interface User {
        partitionKey: string;
        id: string;
        timestamp: Date;
        displayName: string;
        givenName: string;
        jobTitle: string;
        mail: string;
        mobilePhone: string;
        preferredLanguage: string;
        role: string;
        surname: string;
        subscription: Subscription;
        tokenParams: TokenParams;
    }
}