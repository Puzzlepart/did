import { useMutation } from '@apollo/client'
import { FormSubmitHook, IFormControlProps } from 'components'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
import { omitTypename } from 'utils'
import $addOrUpdateRole from './addOrUpdateRole.gql'
import { IRolePanelProps } from './types'

/**
 * A custom form submit hook for the RolePanel component.
 *
 * @param props - The props passed to the RolePanel component.
 * @param model - The form model used by the RolePanel component.
 *
 * @returns The submit props object to be used by the form.
 *
 * @category Roles
 */
export const useRolePanelSubmit: FormSubmitHook<IRolePanelProps> = (
  props,
  model
) => {
  const { t } = useTranslation()
  const [addOrUpdateRole] = useMutation($addOrUpdateRole)
  const disabled =
    s.isBlank(model.value('name')) ||
    s.isBlank(model.value('icon')) ||
    _.isEqual(model.value('permissions'), props.edit?.permissions) ||
    _.isEmpty(model.value('permissions'))

  /**
   * On save role
   */
  async function onSave() {
    await addOrUpdateRole({
      variables: {
        role: omitTypename(model.$),
        update: !!props.edit
      }
    })
    props.onSave()
  }

  const submitProps: IFormControlProps['submitProps'] = {
    text: t('common.save'),
    onClick: onSave,
    disabled
  }

  return submitProps
}
