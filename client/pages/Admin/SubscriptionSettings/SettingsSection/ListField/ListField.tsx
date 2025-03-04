/* eslint-disable no-console */
import { Button, Input } from '@fluentui/react-components'
import { Field } from 'components'
import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { SubscriptionContext } from '../../context'
import styles from './ListField.module.scss'
import { IListFieldProps } from './types'

/**
 * @category SubscriptionSettings
 */
export const ListField: StyledComponent<IListFieldProps> = ({
  settingsKey,
  props
}) => {
  const { t } = useTranslation()
  const context = useContext(SubscriptionContext)
  const items = _.get(context.settings, settingsKey, [])
  const [inputValue, setInputValue] = useState('')
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
        onChange={(_event, data) => setInputValue(data.value)}
        onKeyDown={({ key, currentTarget }) => {
          if (key === 'Enter') {
            context.onChange(settingsKey, (value: string[] = []) => {
              return [...value, currentTarget.value].filter(Boolean)
            })
            setInputValue('')
          }
        }
        } />
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index}>
            <div>{item}</div>
            <div><Button size='small'>{t('common.delete')}</Button></div>
          </li>
        ))}
      </ul>
    </Field>
  )
}

ListField.displayName = 'ListField'
ListField.className = styles.listField