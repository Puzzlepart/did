/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, Float, InputType, ObjectType } from 'type-graphql'
import { IsISO8601, Length, Min, Max, IsOptional } from 'class-validator'

/**
 * Represents a single holiday or non-working day configuration.
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes a holiday or non-working day'
})
export class Holiday {
  /**
   * Date of the holiday in ISO format (YYYY-MM-DD)
   */
  @Field()
  date: string

  /**
   * Name/description of the holiday (e.g., "Christmas Day", "New Year's Eve")
   */
  @Field()
  name: string

  /**
   * Number of hours off for this day (0-8). 8 = full day off, 4 = half day, 0 = working day
   */
  @Field(() => Float)
  hoursOff: number

  /**
   * Whether this holiday recurs annually (true for holidays like Christmas, false for one-time events)
   */
  @Field({ defaultValue: true })
  recurring?: boolean

  /**
   * Optional notes about company-specific rules for this holiday
   */
  @Field({ nullable: true })
  notes?: string
}

/**
 * Input type for creating/updating holidays
 *
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input for creating or updating a holiday'
})
export class HolidayInput {
  @Field()
  @IsISO8601({ strict: true }, { message: 'Date must be in ISO format (YYYY-MM-DD)' })
  date: string

  @Field()
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string

  @Field(() => Float)
  @Min(0, { message: 'Hours off cannot be negative' })
  @Max(8, { message: 'Hours off cannot exceed 8 hours' })
  hoursOff: number

  @Field({ defaultValue: true })
  recurring?: boolean

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 500, { message: 'Notes must be 500 characters or less' })
  notes?: string
}

/**
 * Holiday settings for a subscription
 *
 * @category GraphQL ObjectType
 */
@ObjectType({
  description: 'A type that describes Subscription holiday settings'
})
export class SubscriptionHolidaySettings {
  /**
   * List of configured holidays
   */
  @Field(() => [Holiday], { nullable: true, defaultValue: [] })
  holidays?: Holiday[]

  /**
   * Country code for default holiday preset (e.g., 'NO', 'SE', 'DK')
   */
  @Field({ nullable: true })
  countryCode?: string

  /**
   * Whether holidays are enabled for timebank calculations
   */
  @Field({ defaultValue: true })
  enabled?: boolean
}

/**
 * Input type for holiday settings
 *
 * @category GraphQL InputType
 */
@InputType({
  description: 'Input for Subscription holiday settings'
})
export class SubscriptionHolidaySettingsInput {
  @Field(() => [HolidayInput], { nullable: true })
  holidays?: HolidayInput[]

  @Field({ nullable: true })
  countryCode?: string

  @Field({ defaultValue: true })
  enabled?: boolean
}
