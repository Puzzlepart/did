import { Icon } from '@fluentui/react'
import { Link } from '@fluentui/react-components'
import { DeleteLink, EditLink } from 'components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { ReportLink } from 'types'
import { createColumnDef } from 'utils/createColumnDef'
import { getFluentIcon as icon } from 'utils/getFluentIcon'

type UseColumns = {
  onEdit: (reportLink: ReportLink) => void
  onDelete: (reportLink: ReportLink) => void
}

export function useColumns({ onEdit, onDelete }: UseColumns) {
  const { t } = useTranslation()
  return [
    createColumnDef(
      'published',
      t('admin.reportLinks.publishedLabel'),

      {
        minWidth: 75,
        maxWidth: 75
      },
      (reportLink: ReportLink) =>
        reportLink.published ? (
          <div style={{ textAlign: 'center' }}>
            {icon('Checkmark', true, '#107c10')}
          </div>
        ) : null
    ),
    createColumnDef(
      'promoted',
      t('admin.reportLinks.promotedLabel'),
      {
        minWidth: 75,
        maxWidth: 75
      },
      (reportLink: ReportLink) =>
        reportLink.promoted ? (
          <div style={{ textAlign: 'center' }}>
            {icon('Checkmark', true, '#107c10')}
          </div>
        ) : null
    ),
    createColumnDef(
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
    createColumnDef('description', t('admin.reportLinks.descriptionLabel'), {
      isMultiline: true,
      maxWidth: 300,
      data: { hidden: isMobile }
    }),
    createColumnDef(
      'createdAt',
      t('common.createdLabel'),
      {
        minWidth: 150,
        maxWidth: 150
      },
      (reportLink: ReportLink) =>
        new Date(reportLink.createdAt).toLocaleString()
    ),
    createColumnDef(
      'updatedAt',
      t('common.updatedLabel'),
      {
        minWidth: 150,
        maxWidth: 150
      },
      (reportLink: ReportLink) =>
        new Date(reportLink.updatedAt).toLocaleString()
    ),
    createColumnDef(null, null, { minWidth: 180 }, (reportLink: ReportLink) => (
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
