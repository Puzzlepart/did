import { useAppContext } from 'AppContext'
import {
  IInputFieldProps,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import get from 'get-value'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User, UserInput } from 'types'
import _ from 'underscore'
import { useUsersContext } from '../context'
import { IUserFormProps, createUserInput } from './types'
import { useUserFormSubmit } from './useUserFormSubmit'
import { UserForm } from './UserForm'

/**
 * A custom hook that returns the necessary props and functions for the user form.
 *
 * @param props - The props for the user form.
 */
export function useUserForm(props: IUserFormProps) {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const context = useUsersContext()
  const initialModel = useMemo(() => createUserInput(props.user), [props.user])
  const model = useFormControlModel<keyof UserInput, UserInput>(initialModel)
  const register = useFormControls<keyof User>(model, UserForm)
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

  /**
   * Callback function that sets the form model with the data of the selected user, or resets the model if no user is selected.
   *
   * @param item The selected user item.
   */
  const onSelectUser = useCallback((item) => {
    if (item?.data) {
      for (const key in item.data) {
        model.set(key as any, item.data[key])
      }
    } else {
      model.reset()
    }
  }, [])

  const isEditMode = Boolean(props.user)

  return {
    isEditMode,
    inputProps,
    model,
    register,
    submitProps,
    onSelectUser,
    ...context.state
  }
}
