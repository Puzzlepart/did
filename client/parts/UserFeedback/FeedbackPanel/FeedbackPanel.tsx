import {
  DropdownControl,
  FormControl,
  InputControl,
  InputControlOptions,
  RadioGroupControl,
  SwitchControl
} from 'components/FormControl'
import { PanelComponent } from 'components/Panel'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFeedbackPanel } from './useFeedbackPanel'

/**
 * @category Function Component
 */
export const FeedbackPanel: PanelComponent = (props) => {
  const { t } = useTranslation()
  const { labelOptions, moodOptions, model, register, formControlProps } =
    useFeedbackPanel(props)
  return (
    <FormControl {...formControlProps}>
      <DropdownControl
        {...register('label', { required: true })}
        label={t('feedback.typeFieldLabel')}
        values={labelOptions}
      />
      <InputControl
        {...register<InputControlOptions>('title', {
          required: true,
          casing: 'capitalized'
        })}
        label={t('feedback.summaryFieldLabel')}
      />
      <InputControl
        {...register<InputControlOptions>('body', {
          required: true,
          casing: 'capitalized'
        })}
        label={t('feedback.descriptionFieldLabel')}
        description={t('feedback.descriptionFieldDesc')}
        rows={6}
      />
      <RadioGroupControl
        {...register('mood', { required: true })}
        label={t('feedback.ratingFieldLabel')}
        values={moodOptions}
      />
      <SwitchControl
        {...register('anonymous')}
        label={t('feedback.reportAnonymouslyFieldLabel')}
      />
      <SwitchControl
        {...register('hasGitHubUser')}
        label={t('feedback.hasGitHubUserFieldLabel')}
        description={t('feedback.hasGitHubUserFieldDescription')}
        hidden={model.value('anonymous')}
      />
      <InputControl
        {...register('gitHubUsername')}
        label={t('feedback.gitHubUsernameFieldLabel')}
        contentBefore='@'
        hidden={!model.value('hasGitHubUser')}
        required={model.value('hasGitHubUser')}
      />
    </FormControl>
  )
}

FeedbackPanel.displayName = 'FeedbackPanel'
