import * as React from 'react'
import { useTranslation } from 'react-i18next'
import DateUtils from 'utils/date'
import { format } from 'office-ui-fabric-react/lib/Utilities'

export interface IDurationDisplayProps extends React.HTMLProps<HTMLDivElement> {
    displayFormat?: string;
    duration: number;
}


export const DurationDisplay = ({ displayFormat, duration, style }: IDurationDisplayProps): JSX.Element => {
    const { t } = useTranslation()
    let displayValue = DateUtils.getDurationString(duration, t)
    if (displayFormat) displayValue = format(displayFormat, displayValue)
    return <span style={style}>{displayValue}</span>
}
