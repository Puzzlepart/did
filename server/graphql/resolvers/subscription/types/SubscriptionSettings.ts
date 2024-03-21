/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Field, InputType, ObjectType } from 'type-graphql'
import {
  SubscriptionADSyncSettings,
  SubscriptionADSyncSettingsInput
} from './SubscriptionADSyncSettings'
import {
  SubscriptionForecastSettings,
  SubscriptionForecastSettingsInput
} from './SubscriptionForecastSettings'
import {
  SubscriptionTeamsSettings,
  SubscriptionTeamsSettingsInput
} from './SubscriptionTeamsSettings'
import {
  SubscriptionTimesheetSettings,
  SubscriptionTimesheetSettingsInput
} from './SubscriptionTimesheetSettings'
import {
  SubscriptionVacationSettings,
  SubscriptionVacationSettingsInput
} from './SubscriptionVacationSettings'
import {
  SubscriptionBrandSetting,
  SubscriptionBrandSettingInput
} from './SubscriptionBrandSetting'
import {
  SubscriptionBudgetTrackingSettings,
  SubscriptionBudgetTrackingSettingsInput
} from './SubscriptionBudgetTrackingSettings'
import {
  SubscriptionSecuritySettings,
  SubscriptionSecuritySettingsInput
} from './SubscriptionSecuritySettings'

/**
 * @category GraphQL ObjectType
 */
@ObjectType({ description: 'A type that describes Subscription settings' })
export class SubscriptionSettings {
  @Field(() => SubscriptionBrandSetting, { nullable: true })
  brand?: SubscriptionBrandSetting

  @Field(() => SubscriptionForecastSettings, { nullable: true })
  forecast?: SubscriptionForecastSettings

  @Field(() => SubscriptionADSyncSettings, { nullable: true })
  adsync?: SubscriptionADSyncSettings

  @Field(() => SubscriptionVacationSettings, { nullable: true })
  vacation?: SubscriptionVacationSettings

  @Field(() => SubscriptionTeamsSettings, { nullable: true })
  teams?: SubscriptionTeamsSettings

  @Field(() => SubscriptionTimesheetSettings, { nullable: true })
  timesheet?: SubscriptionTimesheetSettings

  @Field(() => SubscriptionBudgetTrackingSettings, { nullable: true })
  budgetTracking?: SubscriptionBudgetTrackingSettings

  @Field(() => SubscriptionSecuritySettings, { nullable: true })
  security?: SubscriptionSecuritySettings
}

/**
 * @category GraphQL InputType
 */
@InputType({ description: 'A type that describes Subscription AD settings' })
export class SubscriptionSettingsInput {
  @Field(() => SubscriptionBrandSettingInput, { nullable: true })
  brand?: SubscriptionBrandSettingInput

  @Field(() => SubscriptionForecastSettingsInput, { nullable: true })
  forecast?: SubscriptionForecastSettingsInput

  @Field(() => SubscriptionADSyncSettingsInput, { nullable: true })
  adsync?: SubscriptionADSyncSettingsInput

  @Field(() => SubscriptionVacationSettingsInput, { nullable: true })
  vacation?: SubscriptionVacationSettingsInput

  @Field(() => SubscriptionTeamsSettingsInput, { nullable: true })
  teams?: SubscriptionTeamsSettingsInput

  @Field(() => SubscriptionTimesheetSettingsInput, { nullable: true })
  timesheet?: SubscriptionTimesheetSettingsInput

  @Field(() => SubscriptionBudgetTrackingSettingsInput, { nullable: true })
  budgetTracking?: SubscriptionBudgetTrackingSettingsInput

  @Field(() => SubscriptionSecuritySettingsInput, { nullable: true })
  security?: SubscriptionSecuritySettingsInput
}
