import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import { ITextFieldProps } from 'office-ui-fabric-react'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Role, User } from 'types'
import { contains, omit } from 'underscore'
import validator from 'validator'
import { UsersContext } from '../context'
import $addOrUpdateUser from './addOrUpdateUser.gql'

export function useUserForm({ props }) {
  const { t } = useTranslation()
  const { subscription } = useContext(AppContext)
  const { activeDirectoryUsers, roles } = useContext(UsersContext)
  const [model, setModel] = useState<User>({})
  const [addOrUpdateUser] = useMutation($addOrUpdateUser)

  useEffect(() => {
    setModel(props.user || {})
  }, [props.user])

  /**
   * On save user
   */
  const onSave = async () => {
    await addOrUpdateUser({
      variables: {
        user: omit(
          {
            ...model,
            role: (model.role as Role).name
          },
          '__typename'
        ),
        update: !!props.user
      }
    })
    setModel({})
    props.onDismiss()
  }

  /**
   * Checks if form is valid
   */
  const isFormValid = () =>
    !validator.isEmpty(model?.id || '') &&
    validator.isUUID(model?.id || '') &&
    !validator.isEmpty(model?.displayName || '')

  const adSync = subscription?.settings?.adsync || { properties: [] }

  return {
    t,
    adSync,
    activeDirectoryUsers,
    roles,
    model,
    setModel,
    onSave,
    isFormValid,
    inputProps: ({ key, label }): ITextFieldProps => ({
      label,
      disabled: contains(adSync?.properties, key),
      description:
        contains(adSync?.properties, key) && t('admin.userFieldAdSync'),
      value: model[key],
      onChange: (_event, value) => setModel({ ...model, [key]: value })
    })
  }
}
