import { Icon } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { UserMessage } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReportsQueryButtons } from '../hooks'
import styles from './WelcomeTab.module.scss'

export const WelcomeTab: TabComponent = () => {
  const { t } = useTranslation()
  const buttons = useReportsQueryButtons()
  return (
    <div className={styles.root}>
      <UserMessage
        iconName='ReportDocument'
        text={t('reports.selectReportText')}
      />
      <div className={styles.reportButtons}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            text={button.text}
            icon={<Icon {...button.iconProps} />}
            onClick={button.onClick as any}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  )
}
