import {History} from 'history';
import {IProjectsParams} from '../types';

export interface IProjectsReducerParameters {
	url: IProjectsParams;
	history: History;
}
