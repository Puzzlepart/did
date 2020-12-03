import { ProjectLink, ProjectTooltip, UserMessage } from 'components'
import { TFunction } from 'i18next'
import { Icon, MessageBarType } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { TimesheetContext } from '../../context'
import { ClearManualMatchButton } from './ClearManualMatchButton'
import { IgnoreEventButton } from './IgnoreEventButton'
import { MatchEventPanel } from './MatchEventPanel'
import styles from './ProjectColumn.module.scss'
import { IProjectColumnProps } from './types'

/**
 * Get error message
 *
 * @param {string} code Error code
 * @param {TFunction} t Translate function
 */
function getErrorMessage(code: string, t: TFunction): [string, MessageBarType] {
  switch (code) {
    case 'PROJECT_INACTIVE':
      return [t('timesheet.projectInactiveErrorText'), MessageBarType.error]
    case 'CUSTOMER_INACTIVE':
      return [t('timesheet.customerInactiveErrorText'), MessageBarType.error]
  }
}

const ProjectColumn = ({ event }: IProjectColumnProps): JSX.Element => {
  const { t } = useTranslation()
  const { dispatch, selectedPeriod } = useContext(TimesheetContext)
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
          containerStyle={{ marginTop: 10 }}
          isMultiline={true}
          type={MessageBarType.warning}
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
          {!isEmpty(event.project.labels) && <Icon iconName='Tag' className={styles.labelIcon} />}
          {event.manualMatch && !selectedPeriod.isConfirmed && (
            <ClearManualMatchButton
              onClick={() => dispatch({ type: 'CLEAR_MANUAL_MATCH', payload: event.id })}
              className={styles.clearButton}
            />
          )}
        </div>
      </div>
    </ProjectTooltip>
  )
}

export default ProjectColumn
