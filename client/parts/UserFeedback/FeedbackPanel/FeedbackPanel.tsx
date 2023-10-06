import { IPanelProps } from '@fluentui/react'
import {
  DropdownControl,
  FormControl,
  InputControl,
  InputControlOptions,
  RadioGroupControl,
  SwitchControl
} from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useFeedbackPanel } from './useFeedbackPanel'

/**
 * @category Function Component
 */
export const FeedbackPanel: FC<IPanelProps> = (props) => {
  const { t } = useTranslation()
  const { labelOptions, moodOptions, model, register, formControlProps } =
    useFeedbackPanel(props)
  return (
    <FormControl {...formControlProps}>
      <DropdownControl
        {...register('label')}
        label={t('feedback.typeFieldLabel')}
        required={true}
        values={labelOptions}
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
        rows={6}
      />
      <RadioGroupControl
        {...register('mood')}
        label={t('feedback.ratingFieldLabel')}
        required={true}
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
