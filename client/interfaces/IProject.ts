import { IObjectWithKey } from 'office-ui-fabric-react/lib/DetailsList'
import { ICustomer, IOutlookCategory } from './'
import { IEntityLabel } from './IEntityLabel'

/**
 * @category Common
 */
export interface IProject extends IObjectWithKey {
    id: string;
    customerKey: string;
    name: string;
    description: string;
    webLink: string;
    externalSystemURL: string;
    icon: string;
    customer: ICustomer;
    outlookCategory?: IOutlookCategory;
    inactive?: boolean;
    labels?: IEntityLabel[];
}