import { useQuery } from '@apollo/client'
import EventList from 'components/EventList'
import { UserMessage } from 'components/UserMessage'
import { ActionButton, MessageBarType, ProgressIndicator } from 'office-ui-fabric'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { ProjectDetailsContext } from '../context'
import { onExportExcel } from './exportToExcel'
import { Summary } from './summary'
import $timeentries from './timeentries.gql'
import styles from './TimeEntries.module.scss'

export const TimeEntries: FunctionComponent = () => {
  const { t } = useTranslation()
  const { project } = useContext(ProjectDetailsContext)
  const { loading, error, data } = useQuery($timeentries, {
    variables: {
      query: { projectId: project.id }
    }
  })
  const timeentries = data?.timeentries || []
  const empty = isEmpty(timeentries)

  return (
    <div className={styles.root}>
      <Summary timeentries={timeentries} />
      <div hidden={isEmpty(timeentries)}>
        <ActionButton
          text={t('projects.exportTimeEntriesLabel')}
          iconProps={{ iconName: 'ExcelDocument' }}
          onClick={() => onExportExcel(project, timeentries, t)}
        />
      </div>
      {error && <UserMessage type={MessageBarType.error} text={t('projects.timeEntriesErrorText')} />}
      {empty && !loading && <UserMessage text={t('projects.noTimeEntriesText')} />}
      {loading && <ProgressIndicator label={t('projects.timeEntriesLoadingLabel')} />}
      {!empty && (
        <EventList
          events={timeentries}
          additionalColumns={[
            {
              key: 'resource.displayName',
              fieldName: 'resource.displayName',
              name: t('common.employeeLabel'),
              minWidth: 100,
              maxWidth: 150
            }
          ]}
          dateFormat='MMM DD YYYY HH:mm'
          columnWidths={{ time: 250 }}
        />
      )}
    </div>
  )
}
