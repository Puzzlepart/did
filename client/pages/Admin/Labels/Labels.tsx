import { CheckboxVisibility, SelectionMode } from '@fluentui/react'
import { List } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelForm } from './LabelForm'
import styles from './Labels.module.scss'
import { useLabels } from './useLabels'

export const Labels: TabComponent = () => {
  const { t } = useTranslation()
  const {
    items,
    columns,
    loading,
    form,
    setForm,
    ConfirmationDialog,
    onEdit,
    onDelete,
    selectedLabel,
    onSelectionChanged
  } = useLabels()

  return (
    <div className={Labels.className}>
      <List
        enableShimmer={loading}
        items={items}
        columns={columns}
        checkboxVisibility={CheckboxVisibility.onHover}
        selectionProps={{
          mode: SelectionMode.single,
          onChanged: onSelectionChanged
        }}
        menuItems={[
          new ListMenuItem(t('admin.labels.addNewText'))
            .setOnClick(() => setForm({ isOpen: true }))
            .withIcon('Tag'),
          new ListMenuItem(t('common.editLabel'))
            .withIcon('NoteEdit')
            .setDisabled(!selectedLabel)
            .setOnClick(onEdit)
            .setGroup('actions'),
          new ListMenuItem(t('common.delete'))
            .withIcon('Delete')
            .setDisabled(!selectedLabel)
            .setOnClick(onDelete)
            .setGroup('actions')
        ]}
      />
      <LabelForm {...form} />
      {ConfirmationDialog}
    </div>
  )
}

Labels.displayName = 'Labels'
Labels.className = styles.labels
