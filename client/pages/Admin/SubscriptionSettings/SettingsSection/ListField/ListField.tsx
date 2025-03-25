/* eslint-disable unicorn/prevent-abbreviations */
import {
  Input,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup
} from '@fluentui/react-components'
import { DynamicButton, Field } from 'components'
import React from 'react'
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
  addButtonText,
  itemAlreadyAddedMessage,
  props
}) => {
  const {
    items,
    inputValue,
    onChange,
    onKeyDown,
    onAddValue,
    onRemove,
    validation
  } = useListField({
    settingsKey,
    onAddMessage,
    onRemoveMessage,
    itemAlreadyAddedMessage
  })
  return (
    <Field
      className={ListField.className}
      label={props.label}
      description={props.description}
      hidden={props.hidden}
      validation={validation}
    >
      <Input
        {...props}
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        contentAfter={
          Boolean(addButtonText) && (
            <DynamicButton
              text={addButtonText}
              transparent
              size='small'
              iconName='AddCircle'
              disabled={inputValue.trim() === ''}
              onClick={() => onAddValue()}
            />
          )
        }
      />
      <TagGroup
        className={styles.items}
        onDismiss={(_, { value }) => onRemove(value as any)}
      >
        {items.map((item, index) => (
          <InteractionTag key={index} value={index as any}>
            <InteractionTagPrimary hasSecondaryAction>
              {item}
            </InteractionTagPrimary>
            <InteractionTagSecondary />
          </InteractionTag>
        ))}
      </TagGroup>
    </Field>
  )
}

ListField.displayName = 'ListField'
ListField.className = styles.listField
ListField.defaultProps = {}
