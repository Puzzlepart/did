import { IconPicker } from 'components'
import { DropdownControl, FormControl } from 'components/FormControl'
import { TextControl } from 'components/FormControl/TextControl'
import { TextControlOptions } from 'components/FormControl/TextControl/types'
import {
  ToggleControl,
  ToggleControlOptions
} from 'components/FormControl/ToggleControl'
import $date from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { IReportLinksFormProps } from './types'
import { useReportLinksForm } from './useReportLinksForm'

export const ReportLinksForm: FC<IReportLinksFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, submit } = useReportLinksForm(props)
  return (
    <FormControl
      submitProps={submit}
      panelProps={{
        ..._.omit(props, 'onSave'),
        headerText: props.edit
          ? t('admin.reportLinks.editReportLinkText')
          : t('admin.reportLinks.addNewReportText'),
        isLightDismiss: true
      }}
    >
      <TextControl
        {...register<TextControlOptions>('name')}
        label={t('admin.reportLinks.nameLabel')}
        placeholder={t('admin.reportLinks.namePlaceholder')}
        description={t('admin.reportLinks.nameDescription')}
        required={!props.edit}
        disabled={!!props.edit}
      />
      <TextControl
        {...register<TextControlOptions>('description')}
        multiline={true}
        rows={10}
        label={t('admin.reportLinks.descriptionLabel')}
        placeholder={t('admin.reportLinks.descriptionPlaceholder')}
        description={t('admin.reportLinks.descriptionDescription')}
        required={!props.edit}
      />
      <IconPicker
        name='icon'
        model={model}
        label={t('common.iconFieldLabel')}
        description={t('admin.reportLinks.iconDescription')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
        defaultSelected={model.$.icon}
        iconProps={{ styles: { root: { color: model.$.iconColor } } }}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('iconColor')}
        label={t('admin.reportLinks.iconColorLabel')}
        placeholder={t('admin.reportLinks.iconColorPlaceholder')}
        description={t('admin.reportLinks.iconColorDescription')}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('externalUrl')}
        label={t('admin.reportLinks.externalUrlLabel')}
        placeholder={t('admin.reportLinks.externalUrlPlaceholder')}
        description={t('admin.reportLinks.externalUrlDescription')}
        required={true}
      />
      <TextControl
        {...register<TextControlOptions>('year')}
        type='number'
        maxLength={4}
        label={t('admin.reportLinks.yearLabel')}
        placeholder={t('admin.reportLinks.yearPlaceholder')}
        description={t('admin.reportLinks.yearDescription')}
      />
      <DropdownControl
        {...register<TextControlOptions>('month')}
        label={t('admin.reportLinks.monthLabel')}
        placeholder={t('admin.reportLinks.monthPlaceholder')}
        description={t('admin.reportLinks.monthDescription')}
        options={[
          {
            key: null,
            text: ''
          },
          ...$date.getMonthNames().map((month, index) => ({
            key: index,
            text: month
          }))
        ]}
      />
      <ToggleControl
        {...register<ToggleControlOptions>('published')}
        label={t('admin.reportLinks.publishedLabel')}
        description={t('admin.reportLinks.publishedDescription')}
      />
      <ToggleControl
        {...register<ToggleControlOptions>('promoted')}
        label={t('admin.reportLinks.promotedLabel')}
        description={t('admin.reportLinks.promotedDescription')}
      />
    </FormControl>
  )
}

export * from './types'
