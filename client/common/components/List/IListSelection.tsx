import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

/**
 * @category List
 */
export interface IListSelection {
    mode: SelectionMode;
    defaultSelectedKey?: string;
    onChanged: (selected: any) => void;
}
