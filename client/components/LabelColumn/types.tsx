import { ICustomer, IProject } from 'interfaces'


export interface ILabelColumnProps {
    label: string;
    project?: IProject;
    customer?: ICustomer;
}
