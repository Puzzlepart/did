import { IDropdownOption } from 'office-ui-fabric-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UserFeedback } from 'types'

export const useFeedbackModel = () => {
    const { t } = useTranslation()
    const [model, setModel] = useState<UserFeedback>({
        title: '',
        body: '',
        labels: ['feedback:suggestion'],
        mood: null,
    })

    const typeOptions: IDropdownOption[] = [
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

    const moodOptions = [
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
    ].map(opt => ({
        ...opt,
        styles: {
            labelWrapper: {
                paddingTop: 5,
                width: 120,
                maxWidth: 120
            }
        }
    }))

    return {
        model,
        setTitle: (title: string) => setModel({ ...model, title }),
        setBody: (body: string) => setModel({ ...model, body }),
        setType: (type: string) => setModel({ ...model, labels: [type] }),
        setMood: (mood: string) => setModel({ ...model, mood }),
        typeOptions,
        moodOptions
    }
}