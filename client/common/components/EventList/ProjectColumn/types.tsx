import { IProject, ITimeEntry } from 'interfaces';

/**
 * @category EventList
 */
export interface IProjectColumnTooltipClassName {
    root: string;
    title: string;
    subTitle: string;
    description: string;
    tag: string;
}

/**
 * @category EventList
 */
export interface IProjectColumnClassName {
    root: string;
    content: {
        root: string;
        text: string;
        subText: string;
    };
    clearButton: string;
    tooltip: IProjectColumnTooltipClassName;
}

/**
 * @category EventList
 */
export interface IClearManualMatchButtonProps extends React.HTMLProps<HTMLDivElement> {
    onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

/**
 * @category EventList
 */
export interface IProjectColumnTooltipProps {
    project: IProject;
    className: IProjectColumnTooltipClassName;
}

/**
 * @category EventList
 */
export interface IProjectColumnProps {
    event: ITimeEntry;

    isLocked?: boolean;

    /**
     * Class names
     */
    className?: IProjectColumnClassName;

    dispatch?: React.Dispatch<any>;
}
