import {
  IFormControlProps,
  useFormControlModel,
  useFormControls
} from 'components'
import { Role, RoleInput } from 'types'
import { IRolePanelProps } from './types'
import { useRolePanelSubmit } from './useRolePanelSubmit'
import { RolePanel } from './RolePanel'

/**
 * Component logic hook for `<RolePanel />`
 *
 * @category Roles
 */
export function useRolePanel(props: IRolePanelProps) {
  const model = useFormControlModel<keyof RoleInput, RoleInput>(props.edit)
  const submitProps = useRolePanelSubmit(props, model)
  const register = useFormControls<keyof RoleInput>(model, RolePanel)

  const formControlProps: IFormControlProps<Role> = {
    id: RolePanel.displayName,
    model,
    register,
    submitProps,
    panel: {
      ...props.panel,
      open: true
    },
    validateOnBlur: true,
    isEditMode: Boolean(props.edit)
  }

  return formControlProps
}
