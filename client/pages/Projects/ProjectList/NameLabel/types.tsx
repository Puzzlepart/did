import { IContextualMenuItem } from 'office-ui-fabric-react'
import { IProject } from 'interfaces'

export interface INameLabelProps {
    project: IProject;
    actions: IContextualMenuItem;
}
