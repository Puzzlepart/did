import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { getFluentIcon } from 'utils'
import styles from './ClearManualMatchButton.module.scss'
import { IClearManualMatchButtonProps } from './types'

export const ClearManualMatchButton: StyledComponent<
  IClearManualMatchButtonProps
> = (props) => {
  const { t } = useTranslation()
  return (
    <div
      className={ClearManualMatchButton.className}
      hidden={props.hidden}
      title={t('timesheet.clearProjectMatchTooltipText')}
    >
      <span onClick={props.onClick} style={{ cursor: 'pointer' }}>
        {getFluentIcon('CalendarCancel', { size: 16, color: '#ff6666' })}
      </span>
    </div>
  )
}

ClearManualMatchButton.displayName = 'ClearManualMatchButton'
ClearManualMatchButton.className = styles.clearManualMatchButton
