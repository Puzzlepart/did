import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { IFormControlProps, IInputFieldProps } from 'components/FormControl'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Role, User } from 'types'
import _ from 'underscore'
import s from 'underscore.string'
import $addOrUpdateUser from './addOrUpdateUser.gql'
import { IUserFormProps } from './types'

export function useUserForm(props: IUserFormProps) {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
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

  const inputProps = ({ key, label }): IInputFieldProps => ({
    label,
    description: _.contains(adSync?.properties, key)
      ? t('admin.users.userFieldAdSync')
      : null,
    rows: 1,
    disabled: _.contains(adSync?.properties, key),
    value: model[key] ?? '',
    onChange: (_event, value) => setModel({ ...model, [key]: value })
  })

  const submitProps: IFormControlProps['submitProps'] = {
    text: t('common.save'),
    onClick: onSave,
    disabled: !isFormValid()
  }

  return { inputProps, model, setModel, submitProps }
}
