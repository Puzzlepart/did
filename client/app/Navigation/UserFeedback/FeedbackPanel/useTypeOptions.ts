import { IDropdownOption } from 'office-ui-fabric-react'
import { useTranslation } from 'react-i18next'

export const useTypeOptions = (): IDropdownOption[] => {
  const { t } = useTranslation()
  return [
    {
      key: 'feedback:problem',
      text: t('feedback.report_a_problem')
    },
    {
      key: 'feedback:suggestion',
      text: t('feedback.have-a-suggestion')
    },
    {
      key: 'feedback:compliment',
      text: t('feedback.give-a-compliment')
    },
    {
      key: 'feedback:something-else',
      text: t('feedback.something-else')
    }
  ]
}
