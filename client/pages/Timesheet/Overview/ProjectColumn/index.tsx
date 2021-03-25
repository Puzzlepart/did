import { Icon } from '@fluentui/react'
import {
  ProjectLink,
  ProjectTooltip,
  UserMessage,
  UserMessageType
} from 'components'
import { TFunction } from 'i18next'
import { CLEAR_MANUAL_MATCH } from 'pages/Timesheet/reducer/actions'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { useTimesheetContext } from '../../context'
import { ClearManualMatchButton } from './ClearManualMatchButton'
import { IgnoreEventButton } from './IgnoreEventButton'
import { MatchEventPanel } from './MatchEventPanel'
import styles from './ProjectColumn.module.scss'
import { IProjectColumnProps } from './types'

/**
 * Get error message
 *
 * @param code - Error code
 * @param t - Translate function
 */
function getErrorMessage(
  code: string,
  t: TFunction
): [string, UserMessageType] {
  switch (code) {
    case 'PROJECT_INACTIVE':
      return [t('timesheet.projectInactiveErrorText'), 'error']
    case 'CUSTOMER_INACTIVE':
      return [t('timesheet.customerInactiveErrorText'), 'error']
  }
}

export const ProjectColumn = ({ event }: IProjectColumnProps): JSX.Element => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  if (event.isSystemIgnored) {
    return null
  }
  if (!event.project) {
    if (event.error) {
      const [text, type] = getErrorMessage(event.error.code, t)
      return (
        <div className={className}>
          <UserMessage
            containerStyle={{ marginTop: 10 }}
            isMultiline={false}
            type={type}
            text={text}
          />
        </div>
      )
    }
    return (
      <div className={className}>
        <UserMessage
          containerStyle={{ marginTop: 10, width: '90%' }}
          isMultiline={true}
          type={'warning'}
          iconName='TagUnknown'
          text={t('timesheet.noProjectMatchFoundText')}
          actions={
            <div className={styles.eventActions}>
              <MatchEventPanel event={event} />
              <IgnoreEventButton event={event} />
            </div>
          }
        />
      </div>
    )
  }

  return (
    <ProjectTooltip project={event.project}>
      <div className={className}>
        <div className={styles.iconContainer}>
          <Icon iconName={event.project.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.link}>
            <ProjectLink project={event.project} />
          </div>
          {!isEmpty(event.project.labels) && (
            <Icon iconName='Tag' className={styles.labelIcon} />
          )}
          {event.manualMatch && !state.selectedPeriod.isConfirmed && (
            <ClearManualMatchButton
              onClick={() => dispatch(CLEAR_MANUAL_MATCH({ id: event.id }))}
              className={styles.clearButton}
            />
          )}
        </div>
      </div>
    </ProjectTooltip>
  )
}
