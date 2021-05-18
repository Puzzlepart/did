import { useMutation } from '@apollo/client'
import { ITextFieldProps } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Role, User } from 'types'
import _ from 'underscore'
import s from 'underscore.string'
import { UsersContext } from '../context'
import $addOrUpdateUser from './addOrUpdateUser.gql'

export function useUserForm({ props }) {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
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
        user: _.omit(
          {
            ...model,
            role: (model?.role as Role)?.name || 'User'
          },
          '__typename',
          'photo'
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
    !s.isBlank(model?.id || '') && !s.isBlank(model?.displayName || '')

  const adSync = subscription?.settings?.adsync || { properties: [] }

  const inputProps = ({ key, label }): ITextFieldProps => ({
    label,
    disabled: _.contains(adSync?.properties, key),
    description:
      _.contains(adSync?.properties, key) && t('admin.userFieldAdSync'),
    value: model[key],
    onChange: (_event, value) => setModel({ ...model, [key]: value })
  })

  return {
    t,
    adSync,
    activeDirectoryUsers,
    roles,
    model,
    setModel,
    onSave,
    isFormValid,
    inputProps
  }
}
