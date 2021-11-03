import { Label } from '@fluentui/react'
import { ColorPickerField } from 'components'
import { EntityLabel } from 'components/EntityLabel'
import { FormControl } from 'components/FormControl'
import { TextControl } from 'components/FormControl/TextControl'
import { TextControlOptions } from 'components/FormControl/TextControl/types'
import { IconPicker } from 'components/IconPicker'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { ILabelFormProps } from './types'
import { useLabelForm } from './useLabelForm'

export const LabelForm: React.FC<ILabelFormProps> = (props) => {
  const { t } = useTranslation()
  const { model, register, submit } = useLabelForm(props)
  return (
    <FormControl
      submitProps={submit}
      panelProps={{
        ..._.omit(props, 'onSave'),
        headerText: !!props.edit
          ? t('admin.editLabel')
          : t('admin.addNewLabel'),
        isLightDismiss: true
      }}
    >
      <TextControl
        {...register<TextControlOptions>('name', {
          casing: 'lower',
          replace: [/["#$%&'()*+,./:<>?\\{}~-]/g, ' ']
        })}
        spellCheck={false}
        maxLength={20}
        label={t('admin.labelNameLabel')}
        placeholder={t('admin.labelNamePlaceholder')}
        description={t('admin.labelNameDescription')}
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
        multiline={true}
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
