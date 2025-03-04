/* eslint-disable unicorn/prevent-abbreviations */
import { Button, Input } from '@fluentui/react-components'
import { Field } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './ListField.module.scss'
import { IListFieldProps } from './types'
import { useListField } from './useListField'

/**
 * @category SubscriptionSettings
 */
export const ListField: StyledComponent<IListFieldProps> = ({
  settingsKey,
  onAddMessage,
  onRemoveMessage,
  props
}) => {
  const { t } = useTranslation()
  const { items, inputValue, onChange, onKeyDown, onRemove } = useListField({
    settingsKey,
    onAddMessage,
    onRemoveMessage
  })
  return (
    <Field
      className={ListField.className}
      label={props.label}
      description={props.description}
      hidden={props.hidden}
    >
      <Input
        {...props}
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index}>
            <div>{item}</div>
            <div>
              <Button onClick={() => onRemove(index)} size='small'>
                {t('common.delete')}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Field>
  )
}

ListField.displayName = 'ListField'
ListField.className = styles.listField
ListField.defaultProps = {}
