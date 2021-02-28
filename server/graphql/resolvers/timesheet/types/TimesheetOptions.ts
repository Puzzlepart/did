import 'reflect-metadata';
import {Field, InputType} from 'type-graphql';

/**
 * @category InputType
 */
@InputType()
export class TimesheetOptions {
	@Field({nullable: true})
	locale: string;

	@Field({nullable: true})
	dateFormat: string;

	@Field({nullable: true})
	tzOffset: number;

	@Field({nullable: true})
	forecast?: boolean;
}
