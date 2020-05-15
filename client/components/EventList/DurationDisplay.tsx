
import { getDurationDisplay } from 'helpers'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * @ignore
 */
export const DurationDisplay = ({ duration }): JSX.Element => {
    const { t } = useTranslation('COMMON')
    return <span>{getDurationDisplay(duration, t)}</span>
}
