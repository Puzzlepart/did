import { IconPicker } from 'components'
import {
  ChecboxControlOptions,
  CheckboxControl,
  DropdownControl,
  FormControl,
  TextControl,
  TextControlOptions
} from 'components/FormControl'
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
        scroll: true
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
        // type='number'
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
      <CheckboxControl
        {...register<ChecboxControlOptions>('published')}
        label={t('admin.reportLinks.publishedLabel')}
        description={t('admin.reportLinks.publishedDescription')}
      />
      <CheckboxControl
        {...register<ChecboxControlOptions>('promoted')}
        label={t('admin.reportLinks.promotedLabel')}
        description={t('admin.reportLinks.promotedDescription')}
      />
    </FormControl>
  )
}

export * from './types'
