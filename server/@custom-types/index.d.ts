declare namespace Express {
    interface UserSubscription {
        partitionKey: string;
        id: string;
        timestamp: Date;
        connectionString: string;
        name: string;
        settings: any;
    }

    interface User {
        partitionKey?: string;
        id?: string;
        timestamp?: Date;
        displayName?: string;
        givenName?: string;
        jobTitle?: string;
        mail?: string;
        mobilePhone?: string;
        preferredLanguage?: string;
        role?: string;
        surname?: string;
        subscription?: UserSubscription;
        tokenParams?: any;
    }
}