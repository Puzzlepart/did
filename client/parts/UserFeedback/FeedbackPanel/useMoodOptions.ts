import { RadioProps } from '@fluentui/react-components'
import { useTranslation } from 'react-i18next'

export const useMoodOptions = (): RadioProps[] => {
  const { t } = useTranslation()
  return [
    {
      value: '🚀',
      label: t('feedback.very-satisfied'),
      iconProps: { iconName: 'Emoji' }
    },
    {
      value: '😄',
      label: t('feedback.satisfied'),
      iconProps: { iconName: 'Emoji2' }
    },
    {
      value: '😐',
      label: t('feedback.neutral'),
      iconProps: { iconName: 'EmojiNeutral' }
    },
    {
      value: '😢',
      label: t('feedback.dissatisfied'),
      iconProps: { iconName: 'Sad' }
    },
    {
      value: '😭',
      label: t('feedback.very-dissatisfied'),
      iconProps: { iconName: 'EmojiDisappointed' }
    },
    {
      value: '🤸‍♂️',
      label: t('feedback.mixed-feelings'),
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
