import { HTMLProps } from 'react'
import { Role, User } from 'types'


export interface IRolePickerProps extends HTMLProps<HTMLDivElement> {
  roles: Role[];
  model: User;
  onChanged: (role: Role) => void;
}
