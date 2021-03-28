import { NonEmptyArray } from 'type-graphql'
import { ApiTokenResolver } from './apiToken'
import { CustomerResolver } from './customer'
import { LabelResolver } from './label'
import { NotificationResolver } from './notification'
import { OutlookCategoryResolver } from './outlookCategory'
import { ProjectResolver } from './project'
import { ReportsResolver } from './reports'
import { RoleResolver } from './role'
import { SubscriptionResolver } from './subscription'
import { TimesheetResolver } from './timesheet'
import { UserResolver } from './user'

export * from './types'

export {
    ApiTokenResolver,
    CustomerResolver,
    LabelResolver,
    NotificationResolver,
    OutlookCategoryResolver,
    ProjectResolver,
    ReportsResolver,
    RoleResolver,
    SubscriptionResolver,
    TimesheetResolver,
    UserResolver
}

export default [
    ApiTokenResolver,
    CustomerResolver,
    LabelResolver,
    NotificationResolver,
    OutlookCategoryResolver,
    ProjectResolver,
    ReportsResolver,
    RoleResolver,
    SubscriptionResolver,
    TimesheetResolver,
    UserResolver
] as NonEmptyArray<any>