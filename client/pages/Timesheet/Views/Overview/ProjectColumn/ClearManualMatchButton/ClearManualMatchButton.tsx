import { Icon } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './ClearManualMatchButton.module.scss'
import { IClearManualMatchButtonProps } from './types'

export const ClearManualMatchButton: StyledComponent<IClearManualMatchButtonProps> =
  ({ onClick }) => {
    const { t } = useTranslation()
    return (
      <div
        className={ClearManualMatchButton.className}
        title={t('timesheet.clearProjectMatchTooltipText')}
      >
        <span onClick={onClick} style={{ cursor: 'pointer' }}>
          <Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} />
        </span>
      </div>
    )
  }

ClearManualMatchButton.displayName = 'ClearManualMatchButton'
ClearManualMatchButton.className = styles.clearManualMatchButton
