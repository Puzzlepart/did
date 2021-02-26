import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EventObject } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import CustomerColumn from './CustomerColumn'
import ProjectColumn from './ProjectColumn'

/**
 * Use additonal columns
 */
export function useAdditionalColumns() {
    const { t } = useTranslation()
    return useMemo(() => [
        col(
            'customer',
            t('common.customer'),
            { minWidth: 150, maxWidth: 200, isMultiline: true },
            (event: EventObject) => <CustomerColumn event={event} />
        ),
        col(
            'project',
            t('common.project'),
            { minWidth: 150, maxWidth: 300, isMultiline: true },
            (event: EventObject) => <ProjectColumn event={event} />
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [])
}