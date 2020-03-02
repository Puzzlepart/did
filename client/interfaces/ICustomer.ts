import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList';
import { ILabel } from './ILabel';

export interface ICustomer extends IObjectWithKey {
    id: string;
    name: string;
    description: string;
    webLink: string;
    icon: string;
    labels: ILabel[];
}