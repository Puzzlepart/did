/* eslint-disable tsdoc/syntax */
import { ChoiceGroup, DefaultButton, Dropdown, IPanelProps, Panel, PanelType, PrimaryButton, TextField } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FeedbackPanel.module.scss'

/**
 * @category Function Component
 */
export const FeedbackPanel: React.FC<IPanelProps> = () => {
  const { t } = useTranslation()
  return (
    <Panel
      isOpen={true}
      className={styles.root}
      headerText={t('feedback.headerText')}
      type={PanelType.smallFixedFar}
      isLightDismiss={true}>
      <div className={styles.body}>
        <Dropdown
          label={t('feedback.typeFieldLabel')}
          required={true}
          options={[
            {
              key: 'report-a-problem',
              text: t('feedback.report_a_problem')
            },
            {
              key: 'have-a-suggestion',
              text: t('feedback.have-a-suggestion')
            },
            {
              key: 'give-a-compliment',
              text: t('feedback.give-a-compliment')
            },
            {
              key: 'something-else',
              text: t('feedback.something-else')
            }
          ]} />
        <TextField
          label={t('feedback.descriptionFieldLabel')}
          description={t('feedback.descriptionFieldDesc')}
          multiline={true}
          required={true}
        />
        <ChoiceGroup
          label={t('feedback.ratingFieldLabel')}
          required={true}
          options={[
            {
              key: 'very-satisfied',
              text: t('feedback.very-satisfied'),
              iconProps: { iconName: 'Emoji' }
            },
            {
              key: 'satisfied',
              text: t('feedback.satisfied'),
              iconProps: { iconName: 'Emoji2' }
            },
            {
              key: 'neutral',
              text: t('feedback.neutral'),
              iconProps: { iconName: 'EmojiNeutral' }
            },
            {
              key: 'dissatisfied',
              text: t('feedback.dissatisfied'),
              iconProps: { iconName: 'Sad' }
            },
            {
              key: 'very-dissatisfied',
              text: t('feedback.very-dissatisfied'),
              iconProps: { iconName: 'EmojiDisappointed' }
            },
            {
              key: 'mixed-feelings',
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
          }))} />
      </div>
      <div className={styles.footer}>
        <PrimaryButton text={t('feedback.submitButtonText')} />
        <DefaultButton text={t('feedback.cancelButtonLabel')} style={{ marginLeft: 8 }} />
      </div>
    </Panel>
  )
}