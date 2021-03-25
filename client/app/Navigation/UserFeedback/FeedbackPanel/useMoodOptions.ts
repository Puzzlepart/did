import { IChoiceGroupOption } from '@fluentui/react-react'
import { useTranslation } from 'react-i18next'

export const useMoodOptions = (): IChoiceGroupOption[] => {
  const { t } = useTranslation()
  return [
    {
      key: '🚀',
      text: t('feedback.very-satisfied'),
      iconProps: { iconName: 'Emoji' }
    },
    {
      key: '😄',
      text: t('feedback.satisfied'),
      iconProps: { iconName: 'Emoji2' }
    },
    {
      key: '😐',
      text: t('feedback.neutral'),
      iconProps: { iconName: 'EmojiNeutral' }
    },
    {
      key: '😢',
      text: t('feedback.dissatisfied'),
      iconProps: { iconName: 'Sad' }
    },
    {
      key: '😭',
      text: t('feedback.very-dissatisfied'),
      iconProps: { iconName: 'EmojiDisappointed' }
    },
    {
      key: '🤸‍♂️',
      text: t('feedback.mixed-feelings'),
      iconProps: { iconName: 'EmojiTabSymbols' }
    }
  ].map((opt) => ({
    ...opt,
    styles: {
      labelWrapper: {
        paddingTop: 5,
        width: 120,
        maxWidth: 120
      }
    }
  }))
}
