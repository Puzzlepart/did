import 'reflect-metadata';
import {Field, InputType} from 'type-graphql';

/**
 * @category InputType
 */
@InputType()
export class TimesheetQuery {
	@Field()
	startDate: string;

	@Field()
	endDate: string;
}
