/* eslint-disable unicorn/prevent-abbreviations */
import { Icon } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { ReportLinkTooltip } from './ReportLinkTooltip'
import styles from './ReportLinks.module.scss'
import { IReportLinksProps } from './types'
import { useReportLinks } from './useReportLinks'

/**
 * Report links component used to render a set of report links. It either
 * renders a list of report links for the selected query preset, or promoted
 * links if `promoted` property is set to `true`.
 *
 * @category Reports
 */
export const ReportLinks: StyledComponent<IReportLinksProps> = (props) => {
  const { t } = useTranslation()
  const { reportLinks } = useReportLinks(props)
  return (
    <div>
      <UserMessage
        hidden={props.promoted}
        text={t('reports.availableReportLinks')}
      />
      <div className={props.className}>
        {reportLinks.map((link, index) => (
          <ReportLinkTooltip key={index} link={link}>
            <Button
              className={styles.link}
              onClick={() => window.open(link.externalUrl, '_blank')}
              icon={
                <Icon iconName={link.icon} style={{ color: link.iconColor }} />
              }
            >
              {link.name}
            </Button>
          </ReportLinkTooltip>
        ))}
      </div>
    </div>
  )
}

ReportLinks.displayName = 'ReportLinks'
ReportLinks.className = styles.reportLinks
ReportLinks.defaultProps = {
  promoted: false,
  className: ReportLinks.className
}
