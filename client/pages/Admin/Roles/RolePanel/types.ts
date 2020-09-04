import { IRole } from 'interfaces/IRole'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

export interface IRolePanelProps extends IPanelProps {

    /**
     * Role to edit
     */
    edit?: IRole;

    /**
     * On save callback
     * 
     * @param {IRole} role The role that was updated or added
     */
    onSave?: (role: IRole) => void;
}