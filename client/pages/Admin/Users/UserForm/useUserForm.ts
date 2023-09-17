import { useAppContext } from 'AppContext'
import {
  IInputFieldProps,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import get from 'get-value'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import _ from 'underscore'
import { IUserFormProps } from './types'
import { useUserFormSubmit } from './useUserFormSubmit'

export function useUserForm(props: IUserFormProps) {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const model = useFormControlModel<keyof User, User>(props.user, (user) => {
    // A bit nasty temp-hack to fix the role type
    return {
      ...user,
      photo: null,
      role: user.role['name']
    }
  })
  const register = useFormControls<keyof User>(model)
  const submitProps = useUserFormSubmit(props, model)

  const adSyncProperties = get(
    appContext,
    'subscription.settings.adsync.properties',
    { default: [] }
  )

  const inputProps = ({ key, label }): IInputFieldProps => ({
    label,
    description:
      _.contains(adSyncProperties, key) && t('admin.users.userFieldAdSync'),
    disabled: _.contains(adSyncProperties, key)
  })

  const onSelectUser = useCallback((item) => {
    if (item?.data) {
      for (const key in item.data) {
        model.set(key as any, item.data[key])
      }
    } else {
      model.reset()
    }
  }, [])

  const isEditMode = !!props.user

  return { isEditMode, inputProps, model, register, submitProps, onSelectUser }
}
