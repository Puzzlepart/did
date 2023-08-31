import { Icon } from '@fluentui/react'
import { Link } from '@fluentui/react-components'
import {
  bundleIcon,
  CheckmarkFilled,
  CheckmarkRegular
} from '@fluentui/react-icons'
import { DeleteLink, EditLink } from 'components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { ReportLink } from 'types'
import { generateColumn as col } from 'utils/generateColumn'

const CheckmarkIcon = bundleIcon(CheckmarkFilled, CheckmarkRegular)

type UseColumns = {
  onEdit: (reportLink: ReportLink) => void
  onDelete: (reportLink: ReportLink) => void
}

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
      (reportLink: ReportLink) =>
        reportLink.published ? (
          <div style={{ textAlign: 'center' }}>
            <CheckmarkIcon style={{ color: '#107c10' }} />
          </div>
        ) : null
    ),
    col(
      'promoted',
      t('admin.reportLinks.promotedLabel'),
      {
        minWidth: 75,
        maxWidth: 75
      },
      (reportLink: ReportLink) =>
        reportLink.promoted ? (
          <div style={{ textAlign: 'center' }}>
            <CheckmarkIcon style={{ color: '#107c10' }} />
          </div>
        ) : null
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
