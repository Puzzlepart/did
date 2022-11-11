/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { ChoiceGroup, Dropdown, IPanelProps, Toggle } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import {
  FormControl,
  TextControl,
  TextControlOptions
} from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useFeedbackPanel } from './useFeedbackPanel'

/**
 * @category Function Component
 */
export const FeedbackPanel: FC<IPanelProps> = (props) => {
  const { t } = useTranslation()
  const { user } = useAppContext()
  const { model, typeOptions, moodOptions, register, submit } =
    useFeedbackPanel(props)

  return (
    <FormControl
      submitProps={submit}
      panelProps={{
        ...props,
        headerText: t('feedback.headerText'),
        isLightDismiss: true
      }}
    >
      <Dropdown
        label={t('feedback.typeFieldLabel')}
        required={true}
        defaultSelectedKey={_.first(model.value('labels'))}
        options={typeOptions}
        onChange={(_event, option) => model.set('labels', [option.key])}
      />
      <TextControl
        {...register<TextControlOptions>('title', { casing: 'capitalized' })}
        label={t('feedback.summaryFieldLabel')}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('body', { casing: 'capitalized' })}
        label={t('feedback.descriptionFieldLabel')}
        description={t('feedback.descriptionFieldDesc')}
        multiline={true}
        required={true}
        autoAdjustHeight={true}
        styles={{ field: { height: 200 } }}
      />
      <ChoiceGroup
        label={t('feedback.ratingFieldLabel')}
        required={true}
        defaultSelectedKey={model.value('mood')}
        onChange={(_event, option) => model.set('mood', option.key)}
        options={moodOptions}
      />
      <Toggle
        label={t('feedback.reportAnonymouslyFieldLabel')}
        defaultChecked={!model.value('reporter')}
        onChange={(_event, checked) => {
          if (checked) {
            model.set('reporter', null)
          } else {
            model.set('reporter', _.pick(user, 'displayName', 'mail'))
          }
        }}
      />
    </FormControl>
  )
}
