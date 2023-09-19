import { Icon } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { UserMessage } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReportsContext } from '../context'
import styles from './WelcomeTab.module.scss'

export const WelcomeTab: TabComponent = () => {
  const { t } = useTranslation()
  const { state } = useReportsContext()
  const promotedReportLinks = state.reportLinks?.filter((l) => l.promoted) ?? []
  return (
    <div className={WelcomeTab.className}>
      <UserMessage text={t('reports.selectReportText')} />
      <div className={styles.reportButtons}>
        {promotedReportLinks.map((link, index) => (
          <Button
            key={index}
            title={link.name}
            icon={
              <Icon iconName={link.icon} style={{ color: link.iconColor }} />
            }
            onClick={() => {
              window.open(link.externalUrl, '_blank')
            }}
            appearance='transparent'
          >
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

WelcomeTab.displayName = 'WelcomeTab'
WelcomeTab.className = styles.welcomeTab
