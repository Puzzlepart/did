import { Button } from '@fluentui/react-components'
import { List, UserMessage } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
import { useListInputContext } from '../context'
import styles from './ItemsList.module.scss'
import { useItemsList } from './useItemsList'

export const ItemsList: FC = () => {
  const { t } = useTranslation()
  const context = useListInputContext()
  const { isEditing, createColumn, field } = useItemsList()
  return (
    <div className={styles.itemsList}>
      <List
        items={context.state.items}
        columns={[
          ...context.props.fields.map((field) => createColumn(field)),
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
                {t('common.delete')}
              </Button>
            )
          }
        ]}
      />
      {isEditing() && (
        <UserMessage
          text={[
            t('components.listControl.editingInfo'),
            field.infoMessage && `**${field.label}**: ${field.infoMessage}`
          ]
            .filter(Boolean)
            .join('\n\n')}
        />
      )}
    </div>
  )
}
