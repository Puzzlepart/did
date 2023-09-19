import { BasePanel, SearchProject, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './MatchEventPanel.module.scss'
import { SuggestedProjectMessage } from './SuggestedProjectMessage/SuggestedProjectMessage'
import { useMatchEventPanel } from './useMatchEventPanel'

/**
 * Component that renders the panel for matching the event with a project.
 */
export const MatchEventPanel: StyledComponent = () => {
  const { t } = useTranslation()
  const { event, isOpen, onDismiss, onMatch } = useMatchEventPanel()
  return (
    <BasePanel
      isOpen={isOpen}
      headerText={t('timesheet.matchEventPanelHeaderText')}
      headerSubText={event.title}
      onDismiss={onDismiss}
    >
      <div className={styles.matchEventPanel}>
        <UserMessage text={t('timesheet.matchOutlookInfoText', event)} />
        <SuggestedProjectMessage
          eventId={event.id}
          project={event.suggestedProject}
        />
        <UserMessage
          hidden={!event.customer || !!event.suggestedProject}
          text={t('timesheet.eventNotFullyMatchedText', {
            name: event.customer?.name
          })}
        />
        <SearchProject
          width='100%'
          onSelected={onMatch}
          placeholder={t('timesheet.matchEventPanelSearchPlaceholder')}
          autoFocus
        />
      </div>
    </BasePanel>
  )
}

MatchEventPanel.displayName = 'MatchEventPanel'
MatchEventPanel.className = styles.matchEventPanel
