import { NonEmptyArray } from 'type-graphql'
import { ApiTokenResolver } from './apiToken'
import { CustomerResolver } from './customer'
import { LabelResolver } from './label'
import { NotificationResolver } from './notification'
import { OutlookCategoryResolver } from './outlookCategory'
import { ProjectResolver } from './project'
import { ReportLinkResolver } from './reportLink'
import { ReportsResolver } from './reports'
import { RoleResolver } from './role'
import { SubscriptionResolver } from './subscription'
import { TimesheetResolver } from './timesheet'
import { UserResolver } from './user'

export { ApiTokenResolver } from './apiToken'
export { CustomerResolver } from './customer'
export { LabelResolver } from './label'
export { NotificationResolver } from './notification'
export { OutlookCategoryResolver } from './outlookCategory'
export { ProjectResolver } from './project'
export { ReportsResolver } from './reports'
export { RoleResolver } from './role'
export { SubscriptionResolver } from './subscription'
export { TimesheetResolver } from './timesheet'
export * from './types'


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
  UserResolver,
  ReportLinkResolver
] as NonEmptyArray<any>

export {UserResolver} from './user'
export {ReportLinkResolver} from './reportLink'