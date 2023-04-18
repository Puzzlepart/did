import { Icon, Link } from '@fluentui/react'
import { DeleteLink, EditLink } from 'components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { ReportLink } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

type UseColumns = {
  onEdit: (reportLink: ReportLink) => void
  onDelete: (reportLink: ReportLink) => void
}

/**
 * Columns hook for report link list.
 */
export function useColumns({ onEdit, onDelete }: UseColumns) {
  const { t } = useTranslation()
  return [
    col(
      'published',
      t('admin.reportLinks.publishedLabel'),
      {
        minWidth: 75,
        maxWidth: 75
      },
      (reportLink: ReportLink) => (
        <div style={{ textAlign: 'center' }}>
          {reportLink.published ? (
            <Icon iconName='CheckMark' style={{ color: 'green' }} />
          ) : (
            <Icon iconName='Cancel' style={{ color: 'red' }} />
          )}
        </div>
      )
    ),
    col(
      'promoted',
      t('admin.reportLinks.promotedLabel'),
      {
        minWidth: 75,
        maxWidth: 75
      },
      (reportLink: ReportLink) => (
        <div style={{ textAlign: 'center' }}>
          {reportLink.promoted ? (
            <Icon iconName='CheckMark' style={{ color: 'green' }} />
          ) : (
            <Icon iconName='Cancel' style={{ color: 'red' }} />
          )}
        </div>
      )
    ),
    col(
      'name',
      t('admin.reportLinks.nameLabel'),
      { maxWidth: 220 },
      (reportLink: ReportLink) => (
        <div>
          <Icon
            iconName={reportLink.icon}
            styles={{ root: { marginRight: 8, color: reportLink.iconColor } }}
          />
          <Link href={reportLink.externalUrl} target='_blank'>
            {reportLink.name}
          </Link>
        </div>
      )
    ),
    col('description', t('admin.reportLinks.descriptionLabel'), {
      isMultiline: true,
      maxWidth: 300,
      data: { hidden: isMobile }
    }),
    col(
      'createdAt',
      t('common.createdLabel'),
      {
        minWidth: 150,
        maxWidth: 150
      },
      (reportLink: ReportLink) =>
        new Date(reportLink.createdAt).toLocaleString()
    ),
    col(
      'updatedAt',
      t('common.updatedLabel'),
      {
        minWidth: 150,
        maxWidth: 150
      },
      (reportLink: ReportLink) =>
        new Date(reportLink.updatedAt).toLocaleString()
    ),
    col(null, null, { minWidth: 180 }, (reportLink: ReportLink) => (
      <div style={{ display: 'flex' }}>
        <EditLink
          style={{ marginRight: 12 }}
          onClick={() => onEdit(reportLink)}
        />
        <DeleteLink onClick={() => onDelete(reportLink)} />
      </div>
    ))
  ]
}
