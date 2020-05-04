/**
 * @category Common
 */
export interface IUser {
    id?: string;
    fullName?: string;
    email?: string;
    role?: string;
    sub?: string;
    userLanguage?: 'en' | 'nb_no';
}