import { MessageBarButton, Panel } from '@fluentui/react'
import { SearchProject, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MatchEventPanel.module.scss'
import { IMatchEventPanelProps } from './types'
import { useMatchEventPanel } from './useMatchEventPanel'

export const MatchEventPanel = ({ event }: IMatchEventPanelProps) => {
  const { t } = useTranslation()
  const { isPanelOpen, showPanel, hidePanel, onMatch } = useMatchEventPanel(
    event
  )
  return (
    <>
      <MessageBarButton
        text={t('timesheet.resolveProjectButtonLabel')}
        iconProps={{ iconName: 'PenWorkspace' }}
        onClick={showPanel}
      />
      <Panel
        isOpen={isPanelOpen}
        isLightDismiss={true}
        headerText={t('timesheet.matchEventPanelHeaderText')}
        onDismiss={hidePanel}>
        <div className={styles.subText}>{event.title}</div>
        <UserMessage
          iconName='OutlookLogo'
          text={t('timesheet.matchOutlookInfoText', event)}
        />
        <UserMessage
          hidden={!event.suggestedProject}
          containerStyle={{ marginTop: 10 }}
          iconName='Lightbulb'>
          <p>
            <span>{t('timesheet.didYouMeanText')}</span>
            <a href='#' onClick={() => onMatch(event.suggestedProject)}>
              {event.suggestedProject?.tag}
            </a>
            ?
          </p>
        </UserMessage>
        <UserMessage
          hidden={!event.customer || !!event.suggestedProject}
          containerStyle={{ marginTop: 10 }}
          text={t('timesheet.eventNotFullyMatchedText', {
            name: event.customer?.name
          })}
        />
        <SearchProject
          width='100%'
          className={styles.searchProject}
          onSelected={(project) => onMatch(project)}
          placeholder={t('timesheet.matchEventPanelSearchPlaceholder')}
        />
      </Panel>
    </>
  )
}
