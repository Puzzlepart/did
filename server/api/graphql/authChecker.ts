import { AuthChecker } from 'type-graphql'
import { isEmpty } from 'underscore'
import { Context } from './context'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authChecker: AuthChecker<any> = ({ context }: { context: Context }, roles) => {
  if (isEmpty(roles)) return !!context.user
  return true
}
