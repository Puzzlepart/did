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
  const { items, columns, loading, form, setForm, ConfirmationDialog } =
    useLabels()

  return (
    <div className={Labels.className}>
      <List
        enableShimmer={loading}
        items={items}
        columns={columns}
        menuItems={[
          new ListMenuItem(t('admin.labels.addNewText'))
            .setOnClick(() => setForm({ isOpen: true }))
            .withIcon('Tag')
        ]}
      />
      <LabelForm {...form} />
      {ConfirmationDialog}
    </div>
  )
}

Labels.displayName = 'Labels'
Labels.className = styles.labels
