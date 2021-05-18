import { ApiTokenInput } from 'types'

export interface IPermissionsControlProps {
  token: ApiTokenInput
  onToggle: (permissionId: string, checked: boolean) => void
}
