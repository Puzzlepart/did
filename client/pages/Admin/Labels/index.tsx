import { List, TabComponent } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelForm } from './LabelForm'
import { useLabels } from './useLabels'

/**
 * @ignore
 */
export const Labels: TabComponent = () => {
  const { t } = useTranslation()
  const { columns, form, setForm, query, ConfirmationDialog } = useLabels()

  return (
    <>
      <List
        enableShimmer={query.loading}
        items={query.data?.labels}
        columns={columns}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_LABEL',
              name: t('admin.labels.addNewText'),
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
