/* eslint-disable unicorn/no-negated-condition */
import { mergeClasses } from '@fluentui/react-components'
import { CustomerLink, ProjectLink, UserMessage } from 'components'
import React, { ReactElement } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { getFluentIcon } from 'utils'
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
          <ProjectLink project={event.project} withPopover />
          {!_.isEmpty(event.project.labels) &&
            getFluentIcon('TagMultiple', { size: 16 })}
          <ClearManualMatchButton
            hidden={state.selectedPeriod.isConfirmed || !event.manualMatch}
            onClick={() => dispatch(CLEAR_MANUAL_MATCH({ id: event.id }))}
          />
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
