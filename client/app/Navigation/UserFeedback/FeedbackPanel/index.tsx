/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import {
  ChoiceGroup,
  DefaultButton,
  Dropdown,
  IPanelProps,
  Panel,
  PanelType,
  PrimaryButton,
  TextField
} from '@fluentui/react'
import { Toast } from 'components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FeedbackPanel.module.scss'
import { useFeedbackModel } from './useFeedbackModel'
import { useSubmitFeedback } from './useSubmitFeedback'

/**
 * @category Function Component
 */
export const FeedbackPanel: React.FC<IPanelProps> = (props) => {
  const { t } = useTranslation()
  const {
    initModel,
    model,
    setType,
    setTitle,
    setBody,
    setMood,
    typeOptions,
    moodOptions
  } = useFeedbackModel()
  const { onClick, disabled, toast } = useSubmitFeedback(model, props)

  useEffect(initModel, [props.isOpen])

  return (
    <>
      <Panel
        isOpen={props.isOpen}
        className={styles.root}
        headerText={t('feedback.headerText')}
        type={PanelType.smallFixedFar}
        isLightDismiss={true}
        onDismiss={props.onDismiss}>
        <div className={styles.body}>
          <Dropdown
            label={t('feedback.typeFieldLabel')}
            required={true}
            defaultSelectedKey={model.labels[0]}
            options={typeOptions}
            onChange={(_event, option) => setType(option.key as string)}
          />
          <TextField
            label={t('feedback.summaryFieldLabel')}
            required={true}
            value={model.title}
            onChange={(_event, title) => setTitle(title)}
          />
          <TextField
            label={t('feedback.descriptionFieldLabel')}
            description={t('feedback.descriptionFieldDesc')}
            multiline={true}
            required={true}
            autoAdjustHeight={true}
            styles={{ field: { height: 200 } }}
            value={model.body}
            onChange={(_event, body) => setBody(body)}
          />
          <ChoiceGroup
            label={t('feedback.ratingFieldLabel')}
            required={true}
            defaultSelectedKey={model.mood}
            onChange={(_event, option) => setMood(option.key)}
            options={moodOptions}
          />
        </div>
        <div className={styles.footer}>
          <PrimaryButton
            text={t('feedback.submitButtonText')}
            onClick={onClick}
            disabled={disabled}
          />
          <DefaultButton
            text={t('feedback.cancelButtonLabel')}
            onClick={() => props.onDismiss()}
            style={{ marginLeft: 8 }}
          />
        </div>
      </Panel>
      <Toast {...toast} />
    </>
  )
}
