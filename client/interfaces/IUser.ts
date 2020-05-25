import { ISubscription } from './ISubscription'

/**
 * @category Common
 */
export interface IUser {
    id?: string;
    fullName?: string;
    email?: string;
    role?: string;
    sub?: ISubscription;
    userLanguage?: 'en-GB' | 'nb';
    userTheme?: 'light' | 'dark';
}