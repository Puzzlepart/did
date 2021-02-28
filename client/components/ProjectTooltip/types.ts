import {HTMLProps} from 'react';
import {Project} from 'types';

export interface IProjectTooltipProps extends HTMLProps<HTMLDivElement> {
	project: Project;
}
