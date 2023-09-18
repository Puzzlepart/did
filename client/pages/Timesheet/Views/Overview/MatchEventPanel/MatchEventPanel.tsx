import { Link } from '@fluentui/react-components'
import { BasePanel, SearchProject, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './MatchEventPanel.module.scss'
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
      isLightDismiss={true}
      headerText={t('timesheet.matchEventPanelHeaderText')}
      headerSubText={event.title}
      onDismiss={onDismiss}
    >
      <div className={styles.matchEventPanel}>
        <UserMessage text={t('timesheet.matchOutlookInfoText', event)} />
        <UserMessage hidden={!event.suggestedProject}>
          <p>
            <span>{t('timesheet.didYouMeanText')}</span>
            <Link onClick={() => onMatch(event.suggestedProject)}>
              {event.suggestedProject?.tag}
            </Link>
          </p>
        </UserMessage>
        <UserMessage
          hidden={!event.customer || !!event.suggestedProject}
          text={t('timesheet.eventNotFullyMatchedText', {
            name: event.customer?.name
          })}
        />
        <SearchProject
          className={styles.searchProject}
          width='100%'
          onSelected={(project) => onMatch(project)}
          placeholder={t('timesheet.matchEventPanelSearchPlaceholder')}
          autoFocus
        />
      </div>
    </BasePanel>
  )
}

MatchEventPanel.displayName = 'MatchEventPanel'
MatchEventPanel.className = styles.matchEventPanel
