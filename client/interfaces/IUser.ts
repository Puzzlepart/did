import { ISubscription } from './ISubscription'
import { IRole } from './IRole'

/**
 * @category Common
 */
export interface IUser {
    id?: string;
    fullName?: string;
    email?: string;
    role?: IRole;
    sub?: ISubscription;
    userLanguage?: 'en-GB' | 'nb';
    userTheme?: 'light' | 'dark';
}