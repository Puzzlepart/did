import {
  CheckboxControl,
  DropdownControl,
  DropdownControlOptions,
  FormControl,
  IconPickerControl,
  InputControl,
  InputControlOptions
} from 'components/FormControl'
import $date from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IReportLinksFormProps } from './types'
import { useReportLinksForm } from './useReportLinksForm'

export const ReportLinksForm: FC<IReportLinksFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, submitProps, panelProps } = useReportLinksForm(props)
  return (
    <FormControl
      id={ReportLinksForm.displayName}
      model={model}
      submitProps={submitProps}
      panel={panelProps}
    >
      <InputControl
        {...register<InputControlOptions>('name', { required: !props.edit })}
        label={t('admin.reportLinks.nameLabel')}
        placeholder={t('admin.reportLinks.namePlaceholder')}
        description={t('admin.reportLinks.nameDescription')}
        disabled={!!props.edit}
      />
      <InputControl
        {...register<InputControlOptions>('description', {
          required: !props.edit
        })}
        rows={10}
        label={t('admin.reportLinks.descriptionLabel')}
        placeholder={t('admin.reportLinks.descriptionPlaceholder')}
        description={t('admin.reportLinks.descriptionDescription')}
      />
      <IconPickerControl
        name='icon'
        model={model}
        label={t('common.iconFieldLabel')}
        description={t('admin.reportLinks.iconDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
        defaultSelected={model.$.icon}
        required={true}
      />
      <InputControl
        {...register('iconColor', { required: true })}
        label={t('admin.reportLinks.iconColorLabel')}
        placeholder={t('admin.reportLinks.iconColorPlaceholder')}
        description={t('admin.reportLinks.iconColorDescription')}
      />
      <InputControl
        {...register('externalUrl', { required: true })}
        label={t('admin.reportLinks.externalUrlLabel')}
        placeholder={t('admin.reportLinks.externalUrlPlaceholder')}
        description={t('admin.reportLinks.externalUrlDescription')}
      />
      <InputControl
        {...register('year')}
        type='number'
        maxLength={4}
        label={t('admin.reportLinks.yearLabel')}
        placeholder={t('admin.reportLinks.yearPlaceholder')}
        description={t('admin.reportLinks.yearDescription')}
      />
      <DropdownControl
        {...register<DropdownControlOptions>('month', {
          preTransformValue: ({ optionValue }) => Number.parseInt(optionValue)
        })}
        label={t('admin.reportLinks.monthLabel')}
        placeholder={t('admin.reportLinks.monthPlaceholder')}
        description={t('admin.reportLinks.monthDescription')}
        values={[
          {
            value: null,
            text: ''
          },
          ...$date.getMonthNames().map((month, index) => ({
            value: index.toString(),
            text: month
          }))
        ]}
      />
      <CheckboxControl
        {...register('published')}
        label={t('admin.reportLinks.publishedLabel')}
        description={t('admin.reportLinks.publishedDescription')}
      />
      <CheckboxControl
        {...register('promoted')}
        label={t('admin.reportLinks.promotedLabel')}
        description={t('admin.reportLinks.promotedDescription')}
      />
    </FormControl>
  )
}

ReportLinksForm.displayName = 'ReportLinksForm'
