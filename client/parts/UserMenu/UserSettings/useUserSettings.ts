import { useAppContext } from 'AppContext'
import { IFormControlProps } from 'components'
import { useUpdateUserConfiguration } from 'hooks/user/useUpdateUserConfiguration'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { useUserSettingsModel } from './useUserSettingsModel'

export function useUserSettings() {
  const { t } = useTranslation()
  const { updateUserSettings } = useUpdateUserConfiguration()
  const appContext = useAppContext()
  const panel = useBoolean(false)
  const { model, register } = useUserSettingsModel()

  const onSaveUserSettings = async () => {
    await updateUserSettings(model.$)
    panel.setFalse()
    appContext.displayToast(t('common.userSettingsSaved'), 'success')
  }

  const formControlProps: IFormControlProps = {
    model,
    register,
    panel: {
      title: t('common.userSettingsPanelHeaderText'),
      open: panel.value,
      onDismiss: () => panel.setFalse()
    },
    submitProps: {
      text: t('common.save'),
      onClick: onSaveUserSettings
    }
  }

  return {
    openPanel: () => panel.setTrue(),
    formControlProps
  }
}
