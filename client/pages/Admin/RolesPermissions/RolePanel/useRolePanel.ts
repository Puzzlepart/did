import { useMutation } from '@apollo/client'
import { IFormControlProps } from 'components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoleInput } from 'types'
import _ from 'underscore'
import $addOrUpdateRole from './addOrUpdateRole.gql'
import { IRolePanelProps } from './types'

/**
 * Component logic hook for `<RolePanel />`
 *
 * @category Roles
 */
export function useRolePanel(props: IRolePanelProps) {
  const { t } = useTranslation()
  const [addOrUpdateRole] = useMutation($addOrUpdateRole)
  const [model, setModel] = useState<RoleInput>({})
  const isSaveDisabled =
    _.isEmpty(model.name) ||
    _.isEmpty(model.icon) ||
    _.isEqual(model.permissions, props.model?.permissions)

  useEffect(() => {
    if (props.model) setModel(props.model)
  }, [props.model])

  /**
   * On save role
   */
  async function onSave() {
    await addOrUpdateRole({
      variables: {
        role: _.omit(model, '__typename'),
        update: !!props.model
      }
    })
    props.onSave()
  }

  const submitProps: IFormControlProps['submitProps'] = {
    text: t('common.save'),
    onClick: onSave,
    disabled: isSaveDisabled
  }

  const isEdit = !!props.model

  return { model, setModel, submitProps, isEdit }
}
