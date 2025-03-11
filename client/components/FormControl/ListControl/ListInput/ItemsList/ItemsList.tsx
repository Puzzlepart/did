import { Button } from '@fluentui/react-components'
import { List, UserMessage } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
import { useListInputContext } from '../context'
import { ItemCell } from './ItemCell'
import styles from './ItemsList.module.scss'
import { useItemsList } from './useItemsList'

export const ItemsList: FC = () => {
  const { t } = useTranslation()
  const context = useListInputContext()
  const { onToggleEdit, isEditing } = useItemsList()
  return (
    <div className={styles.itemsList}>
      <List
        items={context.state.items}
        columns={[
          ...context.props.fields.map((field) => ({
            key: field.key,
            fieldName: field.key,
            name: field.label,
            minWidth: 100,
            maxWidth: field.maxWidth ?? 140,
            onRender: (item: any, index: number) => (
              <ItemCell
                index={index}
                field={field}
                value={item[field.key]}
                isEditing={isEditing(index, field.key)}
                onToggleEdit={() => onToggleEdit(index, field.key)}
              />
            )
          })),
          {
            key: 'actions',
            fieldName: 'actions',
            name: '',
            minWidth: 60,
            maxWidth: 60,
            onRender: (_: any, index: number) => (
              <Button
                size='small'
                icon={getFluentIcon('Delete')}
                appearance='subtle'
                onClick={() => context.onRemoveItem(index)}
              >
                {t('components.userPicker.removeUser')}
              </Button>
            )
          }
        ]}
      />
      {isEditing() && (
        <UserMessage
          text={t('components.listControl.editingInfo')}
          intent='info'
        />
      )}
    </div>
  )
}
