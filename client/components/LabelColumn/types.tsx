import { ICustomer, IProject } from 'types'


export interface ILabelColumnProps {
    label: string;
    project?: IProject;
    customer?: ICustomer;
}
