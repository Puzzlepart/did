import { List, TabComponent } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReportLinksForm } from './ReportLinksForm'
import { useReportLinks } from './useReportLinks'

/**
 * @ignore
 */
export const ReportLinks: TabComponent = () => {
  const { t } = useTranslation()
  const { columns, form, setForm, query, ConfirmationDialog } = useReportLinks()

  return (
    <>
      <List
        enableShimmer={query.loading}
        items={query.data?.reportLinks}
        columns={columns}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_REPORT_LINK',
              name: t('admin.reportLinks.addNewReportsLink'),
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
    </>
  )
}
