import { PersonaProps, TagProps } from '@fluentui/react-components'
import { HTMLAttributes } from 'react'
import { ProjectRole, User } from 'types'

export interface IUserColumnProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /**
   * User to display
   */
  user: Pick<User, 'displayName' | 'mail' | 'photo' | 'role'>

  /**
   * Size of the persona
   */
  size?: PersonaProps['size']

  /**
   * Display the user's mail address
   */
  displayMail?: boolean

  /**
   * Role of the user in a project. Not to be
   * confused with the user's role in the application.
   * This is optional because the user might not have
   * a role in the project.
   */
  role?: Partial<ProjectRole>

  /**
   * Props for the secondary text.
   */
  secondaryText?: TagProps
}
