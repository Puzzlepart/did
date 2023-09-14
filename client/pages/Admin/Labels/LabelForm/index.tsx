import { Label } from '@fluentui/react'
import { ColorPickerField } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { FormControl } from 'components/FormControl'
import { TextControl } from 'components/FormControl/TextControl'
import { TextControlOptions } from 'components/FormControl/TextControl/types'
import { IconPicker } from 'components/IconPicker'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ILabelFormProps } from './types'
import { useLabelForm } from './useLabelForm'

export const LabelForm: FC<ILabelFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, submitProps, panelProps } = useLabelForm(props)
  return (
    <FormControl submitProps={submitProps} panelProps={panelProps}>
      <TextControl
        {...register<TextControlOptions>('name', {
          casing: 'lower',
          replace: [/["#$%&'()*+,./:<>?\\{}~-]/g, ' ']
        })}
        spellCheck={false}
        maxLength={20}
        label={t('admin.labels.nameLabel')}
        placeholder={t('admin.labels.namePlaceholder')}
        description={t('admin.labels.nameDescription')}
        required={!props.edit}
        disabled={!!props.edit}
      />
      <TextControl
        {...register<TextControlOptions>('description', {
          casing: 'capitalized'
        })}
        spellCheck={false}
        label={t('common.descriptionFieldLabel')}
        placeholder={t('common.descriptionOptionalFieldLabel')}
      />
      <IconPicker
        {...register('icon')}
        label={t('common.iconFieldLabel')}
        placeholder={t('common.iconSearchPlaceholder')}
        width={300}
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

export * from './types'
