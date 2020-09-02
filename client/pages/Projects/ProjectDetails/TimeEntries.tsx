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
    const context = useContext(ProjectDetailsContext)
    context.timeentries.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime())
    return (
        <>
            {context.error && <UserMessage type={MessageBarType.error} text={t('timeEntriesErrorText')} />}
            {(isEmpty(context.timeentries) && !context.loading) && <UserMessage text={t('noTimeEntriesText')} />}
            {context.loading && <ProgressIndicator label={t('timeEntriesLoadingLabel')} />}
            {!isEmpty(context.timeentries) && (
                <EventList
                    events={context.timeentries}
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