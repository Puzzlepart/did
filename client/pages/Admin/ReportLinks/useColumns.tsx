import { Icon } from '@fluentui/react'
import { Caption1, Link } from '@fluentui/react-components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { ReportLink } from 'types'
import { createColumnDef, getFluentIcon } from 'utils'
import styles from './ReportLinks.module.scss'

export function useColumns() {
  const { t } = useTranslation()
  return [
    createColumnDef<ReportLink>(
      'published',
      t('admin.reportLinks.publishedLabel'),

      {
        minWidth: 100,
        maxWidth: 100,
        iconName: 'PromotedDatabase'
      },
      (reportLink) =>
        reportLink.published ? (
          <div style={{ textAlign: 'center' }}>
            {getFluentIcon('Checkmark')}
          </div>
        ) : null
    ),
    createColumnDef<ReportLink>(
      'promoted',
      t('admin.reportLinks.promotedLabel'),
      {
        minWidth: 100,
        maxWidth: 100,
        iconName: 'PromotedDatabase'
      },
      (reportLink) =>
        reportLink.promoted ? (
          <div style={{ textAlign: 'center' }}>
            {getFluentIcon('Checkmark')}
          </div>
        ) : null
    ),
    createColumnDef<ReportLink>(
      'name',
      t('admin.reportLinks.nameLabel'),
      { maxWidth: 220 },
      (reportLink) => (
        <div className={styles.nameColumn}>
          <Icon
            className={styles.icon}
            iconName={reportLink.icon}
            styles={{ root: { color: reportLink.iconColor } }}
          />
          <Link
            className={styles.link}
            href={reportLink.externalUrl}
            target='_blank'
          >
            <Caption1>{reportLink.name}</Caption1>
          </Link>
        </div>
      )
    ),
    createColumnDef<ReportLink>(
      'description',
      t('admin.reportLinks.descriptionLabel'),
      {
        isMultiline: true,
        maxWidth: 300,
        data: { hidden: isMobile }
      }
    ),
    createColumnDef<ReportLink>('createdAt', t('common.createdLabel'), {
      minWidth: 130,
      maxWidth: 130,
      renderAs: 'timeFromNow'
    }),
    createColumnDef<ReportLink>('updatedAt', t('common.updatedLabel'), {
      minWidth: 130,
      maxWidth: 130,
      renderAs: 'timeFromNow'
    })
  ]
}
