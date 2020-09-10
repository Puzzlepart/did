import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox'

export interface IIconPickerProps extends ISearchBoxProps {
    label?: string;
    onSelected: (icon: string) => void;
}
