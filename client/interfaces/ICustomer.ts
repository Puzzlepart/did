/**
 * @category Common
 */
export interface ICustomer {
    key: string;
    name: string;
    description: string;
    webLink: string;
    externalSystemURL: string;
    icon: string;
    inactive?: boolean;
}