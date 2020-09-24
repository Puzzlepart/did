import EventList from 'components/EventList'
import { UserMessage } from 'components/UserMessage'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { generateColumn as col } from 'utils/generateColumn'
import { ProjectDetailsContext } from './ProjectDetailsContext'

export const TimeEntries = () => {
    const { t } = useTranslation()
    const { error, loading, timeentries } = useContext(ProjectDetailsContext)
    return (
        <>
            {error && <UserMessage type={MessageBarType.error} text={t('projects.timeEntriesErrorText')} />}
            {(isEmpty(timeentries) && !loading) && <UserMessage text={t('projects.noTimeEntriesText')} />}
            {loading && <ProgressIndicator label={t('projects.timeEntriesLoadingLabel')} />}
            {!isEmpty(timeentries) && (
                <EventList
                    events={timeentries}
                    additionalColumns={[
                        col(
                            'resourceName',
                            t('employeeLabel')
                        )]}
                    dateFormat='MMM Do YYYY HH:mm'
                    columnWidths={{ time: 250 }} />
            )}
        </>
    )
}