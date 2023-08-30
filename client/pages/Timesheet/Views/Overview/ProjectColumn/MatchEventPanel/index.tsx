import { Link } from '@fluentui/react-components'
import { BasePanel, SearchProject, SubText, UserMessage } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MatchEventPanel.module.scss'
import { useMatchEventPanel } from './useMatchEventPanel'

/**
 * Component that renders the panel for matching the event with a project.
 */
export const MatchEventPanel: FC = () => {
  const { t } = useTranslation()
  const { event, isOpen, onDismiss, onMatch } = useMatchEventPanel()
  if(!isOpen) return null
  return (
    <BasePanel
      isOpen={true}
      isLightDismiss={true}
      headerText={t('timesheet.matchEventPanelHeaderText')}
      onDismiss={onDismiss}
    >
      <SubText text={event.title} font='mediumPlus' />
      <UserMessage
        containerStyle={{ marginTop: 25 }}
        iconName='OutlookLogo'
        text={t('timesheet.matchOutlookInfoText', event)}
      />
      <UserMessage
        hidden={!event.suggestedProject}
        containerStyle={{ marginTop: 10 }}
        iconName='Lightbulb'
      >
        <p>
          <span>{t('timesheet.didYouMeanText')}</span>
          <Link onClick={() => onMatch(event.suggestedProject)}>
            {event.suggestedProject?.tag}
          </Link>
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
        autoFocus
      />
    </BasePanel>
  )
}
