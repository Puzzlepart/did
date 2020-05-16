import * as React from 'react'
import { useTranslation } from 'react-i18next'
import DateUtils from 'utils/date'

/**
 * @ignore
 */
export const DurationDisplay = ({ duration }): JSX.Element => {
    const { t } = useTranslation('COMMON')
    return <span>{DateUtils.getDurationDisplay(duration, t)}</span>
}
