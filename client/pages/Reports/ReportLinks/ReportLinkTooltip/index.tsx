/* eslint-disable react-hooks/exhaustive-deps */
import { TooltipHost } from '@fluentui/react'
import $date from 'DateUtils'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ReportLinkTooltip.module.scss'
import { IReportLinkTooltipProps } from './types'

/**
 * Report link tooltip. Displays a tooltip with more information about the report link
 * like description, who updated the report and when.
 *
 * @category Reports
 */
export const ReportLinkTooltip: FC<IReportLinkTooltipProps> = ({
  link,
  children
}) => {
  const { t } = useTranslation()
  return (
    <TooltipHost
      content={
        <div className={styles.root}>
          <div className={styles.name}>{link.name}</div>
          <p className={styles.description}>{link.description}</p>
          <p className={styles.updated}>
            {t('reports.reportLinkUpdatedText', {
              ...link,
              updatedAt: $date.formatDate(link.updatedAt, 'MMM DD, YYYY HH:mm')
            })}
          </p>
        </div>
      }
    >
      {children}
    </TooltipHost>
  )
}
