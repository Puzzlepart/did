import { SelectionMode } from '@fluentui/react'
import { List } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ReportLinks.module.scss'
import { ReportLinksForm } from './ReportLinksForm'
import { useReportLinks } from './useReportLinks'

export const ReportLinks: TabComponent = () => {
  const { t } = useTranslation()
  const {
    columns,
    form,
    setForm,
    query,
    ConfirmationDialog,
    onEdit,
    onDelete,
    onSelectionChanged,
    selectedLink
  } = useReportLinks()

  return (
    <div className={ReportLinks.className}>
      <List
        enableShimmer={query.loading}
        items={query.data?.reportLinks}
        columns={columns}
        selectionProps={[SelectionMode.single, onSelectionChanged]}
        menuItems={[
          new ListMenuItem(t('admin.reportLinks.addNewReportsLink'))
            .withIcon('Add')
            .setOnClick(() => setForm({ isOpen: true })),
          new ListMenuItem(t('common.editLabel'))
            .withIcon('LinkEdit')
            .setOnClick(onEdit)
            .setDisabled(!selectedLink)
            .setGroup('actions'),
          new ListMenuItem(t('common.delete'))
            .withIcon('Delete')
            .setOnClick(onDelete)
            .setDisabled(!selectedLink)
            .setGroup('actions')
        ]}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_REPORT_LINK',
              text: t('admin.reportLinks.addNewReportsLink'),
              iconProps: { iconName: 'Add' },
              onClick: () => {
                setForm({ isOpen: true })
              }
            }
          ],
          farItems: []
        }}
      />
      <ReportLinksForm {...form} />
      {ConfirmationDialog}
    </div>
  )
}

ReportLinks.displayName = 'ReportLinks'
ReportLinks.className = styles.reportLinks
