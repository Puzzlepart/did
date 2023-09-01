import { Button } from '@fluentui/react-components'
import { UserMessage } from 'components'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import { ReportLinkTooltip } from './ReportLinkTooltip'
import styles from './ReportLinks.module.scss'
import { Icon } from '@fluentui/react'

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
      <UserMessage text={t('reports.availableReportLinks')} />
      {context.state.queryPreset.reportLinks.map((link, index) => (
        <ReportLinkTooltip key={index} link={link}>
          <Button
            className={styles.link}
            onClick={() => window.open(link.externalUrl, '_blank')}
            icon={<Icon iconName='ExcelDocument' />}>
            {link.name}
          </Button>
        </ReportLinkTooltip>
      ))}
    </div>
  )
}
