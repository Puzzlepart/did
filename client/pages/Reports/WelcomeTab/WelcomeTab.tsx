import { UserMessage } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReportLinks } from '../ReportLinks'
import styles from './WelcomeTab.module.scss'

export const WelcomeTab: TabComponent = () => {
  const { t } = useTranslation()
  return (
    <div className={WelcomeTab.className}>
      <UserMessage text={t('reports.selectReportText')} />
      <ReportLinks className={styles.promotedReportLinks} promoted />
    </div>
  )
}

WelcomeTab.displayName = 'WelcomeTab'
WelcomeTab.className = styles.welcomeTab
