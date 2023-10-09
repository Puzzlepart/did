import {
  IFormControlProps,
  useFormControlModel,
  useFormControls
} from 'components'
import { RoleInput } from 'types'
import { IRolePanelProps } from './types'
import { useRolePanelSubmit } from './useRolePanelSubmit'

/**
 * Component logic hook for `<RolePanel />`
 *
 * @category Roles
 */
export function useRolePanel(props: IRolePanelProps) {
  const model = useFormControlModel<keyof RoleInput, RoleInput>(props.edit)
  const submitProps = useRolePanelSubmit(props, model)
  const register = useFormControls<keyof RoleInput>(model)

  const panelProps: IFormControlProps['panel'] = {
    ...props.panel,
    open: true
  }

  const isEditMode = !!props.edit

  return { model, register, submitProps, panelProps, isEditMode }
}
