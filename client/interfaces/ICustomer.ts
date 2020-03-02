import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList';

export interface ICustomer extends IObjectWithKey {
    id: string;
    name: string;
    description: string;
    webLink: string;
    icon: string;
}