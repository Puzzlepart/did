import { Link, MessageBarButton, Panel } from '@fluentui/react'
import { SearchProject, SubText, UserMessage } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './MatchEventPanel.module.scss'
import { IMatchEventPanelProps } from './types'
import { useMatchEventPanel } from './useMatchEventPanel'

export const MatchEventPanel = ({ event }: IMatchEventPanelProps) => {
  const { t } = useTranslation()
  const { isPanelOpen, showPanel, hidePanel, onMatch } =
    useMatchEventPanel(event)
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
        onDismiss={hidePanel}
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
        />
      </Panel>
    </>
  )
}
