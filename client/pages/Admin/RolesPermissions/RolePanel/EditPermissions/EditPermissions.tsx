import {
  Combobox,
  Option,
  OptionGroup,
  mergeClasses
} from '@fluentui/react-components'
import { Field, FieldDescription } from 'components/FormControl'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './EditPermissions.module.scss'
import { IEditPermissionsProps } from './types'
import { useEditPermissions } from './useEditPermissions'

export const EditPermissions: StyledComponent<IEditPermissionsProps> = (
  props
) => {
  const { t } = useTranslation()
  const {
    label,
    permissionsGrouped,
    selectedOptions,
    value,
    setSelectedPermissions
  } = useEditPermissions(props)
  return (
    <Field
      name={props.name}
      label={label}
      className={mergeClasses(EditPermissions.className, props.className)}
    >
      <Combobox
        multiselect
        value={value}
        selectedOptions={selectedOptions}
        onOptionSelect={(_, data) =>
          setSelectedPermissions(data.selectedOptions)
        }
      >
        {Object.keys(permissionsGrouped).map((key) => (
          <OptionGroup key={key} label={t(`permissions.category_${key}`)}>
            {permissionsGrouped[key].map((p) => (
              <Option
                key={p.id}
                value={p.id}
                disabled={(!p.api && props.api) || p.disabled}
              >
                {p.name}
              </Option>
            ))}
          </OptionGroup>
        ))}
      </Combobox>
      <FieldDescription text={props.description} />
    </Field>
  )
}

EditPermissions.displayName = 'EditPermissions'
EditPermissions.className = styles.editPermissions
EditPermissions.defaultProps = {
  api: false,
  selectedPermissions: [],
  name: 'permissions',
  buttonIcon: 'KeyMultiple',
  labelFormat: '{{label}} ({{count}})'
}
