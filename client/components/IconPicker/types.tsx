import { ISearchBoxProps } from 'office-ui-fabric'

export interface IIconPickerProps extends ISearchBoxProps {
    label?: string;
    defaultSelected?: string;
    onSelected: (icon: string) => void;
}
