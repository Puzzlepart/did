import { List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelForm } from './LabelForm'
import { useLabels } from './useLabels'

/**
 * @ignore
 */
export const Labels: TabComponent = () => {
  const { t } = useTranslation()
  const { items, columns, loading, form, setForm, ConfirmationDialog } =
    useLabels()

  return (
    <>
      <List
        enableShimmer={loading}
        items={items}
        columns={columns}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_LABEL',
              text: t('admin.labels.addNewText'),
              iconProps: { iconName: 'Add' },
              onClick: () => setForm({ isOpen: true })
            }
          ],
          farItems: []
        }}
      />
      <LabelForm {...form} />
      {ConfirmationDialog}
    </>
  )
}
