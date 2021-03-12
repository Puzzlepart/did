import { Icon, TooltipHost } from 'office-ui-fabric-react'
import React from 'react'
import { isEmpty } from 'underscore'
import { IWeekColumnProps } from './types'
import styles from './WeekColumn.module.scss'

export const WeekColumnTooltip = (props: IWeekColumnProps) => {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ fontSize: 18 }}>Uke 40</div>
      <div style={{ fontSize: 14, marginBottom: 12 }}>{props.user}</div>
      <div>
        Jobbet <b>24 timer</b>. for Yara.
      </div>
      <div>
        Jobbet <b>10 timer</b> for Puzzlepart.
      </div>
      <div>
        Jobbet <b>6 timer</b> for Kristiansand kommune.
      </div>
      <div>
        Totalt <b>40 timer</b>.
      </div>
    </div>
  )
}

export const WeekColumn = (props: IWeekColumnProps) => {
  if (isEmpty(props.periods)) {
    return null
  }

  const hours = props.periods.reduce((sum, period) => sum + period.hours, 0)

  return (
    <TooltipHost content={<WeekColumnTooltip {...props} />}>
      <div className={styles.root}>
        <Icon iconName='CheckboxComposite' className={styles.checkMark} />
        <span>{hours}h</span>
      </div>
    </TooltipHost>
  )
}

export * from './types'
