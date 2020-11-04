import { Customer, Project } from 'types'


export interface ILabelColumnProps {
    label: string;
    project?: Project;
    customer?: Customer;
}
