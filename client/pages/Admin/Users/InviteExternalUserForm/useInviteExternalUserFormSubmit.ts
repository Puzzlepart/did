/* eslint-disable unicorn/consistent-function-scoping */
import { FormSubmitHook, IFormControlProps } from 'components/FormControl'
import { useMap } from 'hooks'
import { useTranslation } from 'react-i18next'
import { IInviteExternalUserFormProps } from './types'

export const useInviteExternalUserFormSubmit: FormSubmitHook<
  IInviteExternalUserFormProps,
  ReturnType<typeof useMap>
> = () => {
  const { t } = useTranslation()

  const onSave = async () => {
    // eslint-disable-next-line no-console
    console.log('Saving...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return {
    text: t('common.save'),
    onClick: onSave
  } as IFormControlProps['submitProps']
}
