/* eslint-disable react-hooks/exhaustive-deps */
import { ActionButton } from '@fluentui/react'
import { UserMessage } from 'components'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import styles from './ReportLinks.module.scss'
import { ReportLinkTooltip } from './ReportLinkTooltip'

/**
 * Report links. This component is used when the report links are available.
 * Renders a list of links to external reports with a tooltip with more information
 * like description, who updated the report and when.
 *
 * @category Reports
 */
export const ReportLinks: FC = () => {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  return (
    <div className={styles.root}>
      <UserMessage
        iconName='PageData'
        text={t('reports.availableReportLinks')}
        styles={{ root: { marginBottom: 20 } }}
      />
      {context.state.queryPreset.reportLinks.map((link, index) => (
        <ReportLinkTooltip key={index} link={link}>
          <ActionButton
            className={styles.link}
            text={link.name}
            href={link.externalUrl}
            target='_blank'
            iconProps={{ iconName: 'ExcelDocument' }}
          />
        </ReportLinkTooltip>
      ))}
    </div>
  )
}
