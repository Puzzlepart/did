/* eslint-disable tsdoc/syntax */
import { List, TabComponent } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelForm } from './LabelForm'
import { useLabels } from './useLabels'

export const Labels: TabComponent = () => {
  const { t } = useTranslation()
  const {
    columns,
    form,
    setForm,
    query,
    confirmDeleteDialog
  } = useLabels()

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
              name: t('admin.addNewLabel'),
              iconProps: { iconName: 'Add' },
              onClick: () => setForm({ isOpen: true })
            }
          ],
          farItems: []
        }}
      />
      <LabelForm {...form} />
      {confirmDeleteDialog}
    </>
  )
}
