import { Tooltip } from '@fluentui/react-components'
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
export const ReportLinkTooltip: FC<IReportLinkTooltipProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Tooltip
      relationship='description'
      content={
        <div className={styles.root}>
          <div className={styles.name}>{props.link.name}</div>
          <p className={styles.description}>{props.link.description}</p>
          <p className={styles.updated}>
            {t('reports.reportLinkUpdatedText', {
              ...props.link,
              updatedAt: $date.formatDate(props.link.updatedAt, 'MMM DD, YYYY HH:mm')
            })}
          </p>
        </div>
      }
    >
      <div>
        {props.children}
      </div>
    </Tooltip>
  )
}
