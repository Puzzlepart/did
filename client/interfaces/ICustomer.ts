import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList';

/**
 * @category Common
 */
export interface ICustomer extends IObjectWithKey {
    id: string;
    name: string;
    description: string;
    webLink: string;
    icon: string;
    inactive?: boolean;
}