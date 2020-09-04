import EventList from 'components/EventList'
import { UserMessage } from 'components/UserMessage'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { generateColumn as col } from 'utils/generateColumn'
import { ProjectDetailsContext } from './types'
import { isEmpty } from 'underscore'

export const TimeEntries = () => {
    const { t } = useTranslation(['projects', 'common'])
    const {error,loading,timeentries} = useContext(ProjectDetailsContext)
    return (
        <>
            {error && <UserMessage type={MessageBarType.error} text={t('timeEntriesErrorText')} />}
            {(isEmpty(timeentries) && !loading) && <UserMessage text={t('noTimeEntriesText')} />}
            {loading && <ProgressIndicator label={t('timeEntriesLoadingLabel')} />}
            {!isEmpty(timeentries) && (
                <EventList
                    events={timeentries}
                    additionalColumns={[
                        col(
                            'resourceName',
                            t('employeeLabel', { ns: 'common' })
                        )]}
                    dateFormat='MMM Do YYYY HH:mm'
                    columnWidths={{ time: 250 }} />
            )}
        </>
    )
}