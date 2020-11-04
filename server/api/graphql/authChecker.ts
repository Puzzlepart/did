import { AuthChecker } from 'type-graphql'
import { Context } from './context'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authChecker: AuthChecker<any> = ({ context }: { context: Context }, roles) => {
  return context.isAuthorized
}
