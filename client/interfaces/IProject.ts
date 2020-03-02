import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList';
import { ICustomer } from './ICustomer';
import { ILabel } from './ILabel';

export interface IProject extends IObjectWithKey {
    id: string;
    customerKey: string;
    name: string;
    description: string;
    webLink: string;
    icon: string;
    customer: ICustomer;
    labels: ILabel[];
}