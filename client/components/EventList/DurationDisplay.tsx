import * as React from 'react'
import { useTranslation } from 'react-i18next'
import DateUtils from 'utils/date'
import format from 'string-format'

export interface IDurationDisplayProps extends React.HTMLProps<HTMLDivElement> {
    displayFormat?: string;
    duration: number;
}

/**
 * @ignore
 */
export const DurationDisplay = ({ displayFormat, duration, style }: IDurationDisplayProps): JSX.Element => {
    const { t } = useTranslation('common')
    let displayValue = DateUtils.getDurationDisplay(duration, t)
    if (displayFormat) displayValue = format(displayFormat, displayValue)
    return <span style={style}>{displayValue}</span>
}
