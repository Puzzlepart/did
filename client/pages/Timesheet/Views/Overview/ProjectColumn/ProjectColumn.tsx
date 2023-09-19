import { Icon } from '@fluentui/react'
import { AlertProps } from '@fluentui/react-components/dist/unstable'
import { ProjectLink, ProjectPopover, UserMessage } from 'components'
import { TFunction } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import {
  CLEAR_MANUAL_MATCH,
  IGNORE_EVENT,
  TOGGLE_MANUAL_MATCH_PANEL
} from '../../../reducer/actions'
import { ClearManualMatchButton } from './ClearManualMatchButton/ClearManualMatchButton'
import styles from './ProjectColumn.module.scss'
import { IProjectColumnProps } from './types'
import { useProjectColumn } from './useProjectColumn'

/**
 * Get error message for the event by error code. Translate function
 * from i18next is passed as a parameter due to the fact that this function
 * is called from the component and the hook can't be called inside the loop.
 *
 * @param code - Error code
 * @param t - Translate function
 */
function getErrorMessage(
  code: string,
  t: TFunction
): [string, AlertProps['intent']] {
  switch (code) {
    case 'PROJECT_INACTIVE': {
      return [t('timesheet.projectInactiveErrorText'), 'error']
    }
    case 'CUSTOMER_INACTIVE': {
      return [t('timesheet.customerInactiveErrorText'), 'error']
    }
    case 'EVENT_NO_TITLE': {
      return [t('timesheet.eventNoTitleErrorText'), 'error']
    }
  }
}

/**
 * Component that renders the project column for the event list.
 */
export const ProjectColumn: StyledComponent<IProjectColumnProps> = ({
  event
}) => {
  const { t } = useTranslation()
  const { state, dispatch, className } = useProjectColumn()

  if (event.isSystemIgnored) return null
  if (!event.project) {
    if (event.error) {
      const [text, intent] = getErrorMessage(event.error.code, t)
      return (
        <div className={className}>
          <UserMessage intent={intent} text={text} />
        </div>
      )
    }
    return (
      <div className={className}>
        <UserMessage
          intent='warning'
          text={t('timesheet.noProjectMatchFoundText')}
          actions={[
            {
              content: t('timesheet.resolveProjectButtonLabel'),
              iconName: 'AddCircle',
              onClick: () => {
                dispatch(TOGGLE_MANUAL_MATCH_PANEL({ event }))
              }
            },
            {
              content: t('timesheet.ignoreEventButtonLabel'),
              iconName: 'CalendarCancel',
              onClick: () => {
                dispatch(IGNORE_EVENT({ id: event.id }))
              }
            }
          ]}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <div className={styles.content}>
        <ProjectPopover project={event.project}>
          <div className={styles.link}>
            <ProjectLink project={event.project} />
          </div>
        </ProjectPopover>
        {!_.isEmpty(event.project.labels) && (
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
  )
}

ProjectColumn.displayName = 'ProjectColumn'
ProjectColumn.className = styles.projectColumn
