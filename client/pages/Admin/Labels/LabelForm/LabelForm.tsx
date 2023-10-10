import { Label } from '@fluentui/react'
import { ColorPickerField } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import {
  FormControl,
  IconPickerControl,
  InputControl,
  InputControlOptions
} from 'components/FormControl'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ILabelFormProps } from './types'
import { useLabelForm } from './useLabelForm'

export const LabelForm: FC<ILabelFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, submitProps, panelProps } = useLabelForm(props)
  return (
    <FormControl submitProps={submitProps} panel={panelProps}>
      <InputControl
        {...register<InputControlOptions>('name', {
          casing: 'lower',
          replace: [/["#$%&'()*+,./:<>?\\{}~-]/g, ' ']
        })}
        maxLength={20}
        label={t('admin.labels.nameLabel')}
        placeholder={t('admin.labels.namePlaceholder')}
        description={t('admin.labels.nameDescription')}
        required={!props.edit}
        disabled={!!props.edit}
      />
      <InputControl
        {...register<InputControlOptions>('description', {
          casing: 'capitalized'
        })}
        label={t('common.descriptionFieldLabel')}
        placeholder={t('common.descriptionOptionalFieldLabel')}
        rows={4}
      />
      <IconPickerControl
        {...register('icon')}
        label={t('common.iconFieldLabel')}
        placeholder={t('common.iconSearchPlaceholder')}
      />
      <ColorPickerField
        label={t('common.colorLabel')}
        color={model.value('color')}
        onChanged={(value) => model.set('color', value)}
      />
      <div>
        <Label>{t('common.previewText')}</Label>
        <EntityLabel label={model.$} />
      </div>
    </FormControl>
  )
}
