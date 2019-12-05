import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList';
import { ICustomer } from './ICustomer';

export interface IProject extends IObjectWithKey {
    id: string;
    customerKey: string;
    name: string;
    description: string;
    webLink: string;
    icon: string;
    budget: number;
    hourlyRate: number;
    customer: ICustomer;
}