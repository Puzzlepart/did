import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList';

export interface ILabel extends IObjectWithKey {
    id?: string;
    name: string;
    description: string;
    color: string;
    icon?: string;
} 