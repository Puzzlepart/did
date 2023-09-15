/* eslint-disable tsdoc/syntax */
import { ChoiceGroup, Dropdown, IPanelProps, Toggle } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import {
  FormControl,
  InputControl,
  InputControlOptions
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
      <InputControl
        {...register<InputControlOptions>('title', { casing: 'capitalized' })}
        label={t('feedback.summaryFieldLabel')}
        required={true}
      />
      <InputControl
        {...register<InputControlOptions>('body', { casing: 'capitalized' })}
        label={t('feedback.descriptionFieldLabel')}
        description={t('feedback.descriptionFieldDesc')}
        required={true}
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
