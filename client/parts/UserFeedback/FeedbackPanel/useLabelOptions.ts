import { OptionProps } from '@fluentui/react-components'
import { useTranslation } from 'react-i18next'

export const useLabelOptions = (): OptionProps[] => {
  const { t } = useTranslation()
  return [
    {
      value: 'feedback:problem',
      text: t('feedback.report_a_problem')
    },
    {
      value: 'feedback:suggestion',
      text: t('feedback.have-a-suggestion')
    },
    {
      value: 'feedback:compliment',
      text: t('feedback.give-a-compliment')
    },
    {
      value: 'feedback:something-else',
      text: t('feedback.something-else')
    }
  ]
}
