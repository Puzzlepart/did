/* eslint-disable unicorn/no-negated-condition */
import { Icon } from '@fluentui/react'
import { mergeClasses } from '@fluentui/react-components'
import {
  CustomerLink,
  ProjectLink,
  ProjectPopover,
  UserMessage
} from 'components'
import React, { ReactElement } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { useTimesheetContext } from '../../../context'
import {
  CLEAR_MANUAL_MATCH,
  IGNORE_EVENT,
  TOGGLE_MANUAL_MATCH_PANEL
} from '../../../reducer/actions'
import { ClearManualMatchButton } from './ClearManualMatchButton'
import styles from './ProjectColumn.module.scss'
import { IProjectColumnProps } from './types'
import { useProjectColumn } from './useProjectColumn'

/**
 * Component that renders the project column for the event list.
 */
export const ProjectColumn: StyledComponent<IProjectColumnProps> = ({
  event,
  includeCustomerLink
}) => {
  const { t } = useTranslation('timesheet')
  const { state, dispatch } = useTimesheetContext()
  const { errorMessage } = useProjectColumn(event)
  let element: ReactElement = null

  if (event.isSystemIgnored) {
    element = null
  } else if (event.project) {
    element = (
      <>
        {includeCustomerLink && <CustomerLink customer={event.customer} />}
        <div className={styles.content}>
          <ProjectPopover project={event.project}>
            <ProjectLink project={event.project} />
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
      </>
    )
  } else if (event.error) {
    element = <UserMessage {...errorMessage} />
  } else {
    element = (
      <UserMessage
        intent='warning'
        text={t('noProjectMatchFoundText')}
        onClick={() => dispatch(TOGGLE_MANUAL_MATCH_PANEL({ event }))}
        action={{
          text: t('ignoreEventActionTooltip', event),
          iconName: 'CalendarCancel',
          iconColor: 'var(--colorPaletteRedForeground1)',
          onClick: () => {
            dispatch(IGNORE_EVENT({ id: event.id }))
          }
        }}
      />
    )
  }
  return (
    <div
      className={mergeClasses(
        ProjectColumn.className,
        isMobile && styles.mobile
      )}
    >
      {element}
    </div>
  )
}

ProjectColumn.displayName = 'ProjectColumn'
ProjectColumn.className = styles.projectColumn
