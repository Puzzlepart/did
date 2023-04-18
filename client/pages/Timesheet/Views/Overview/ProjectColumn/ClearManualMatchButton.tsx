import { Icon } from '@fluentui/react'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProjectColumn.module.scss'
import { IClearManualMatchButtonProps } from './types'

export const ClearManualMatchButton: FC<IClearManualMatchButtonProps> = ({
  onClick
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={styles.clearButton}
      title={t('timesheet.clearProjectMatchTooltipText')}
    >
      <span onClick={onClick} style={{ cursor: 'pointer' }}>
        <Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} />
      </span>
    </div>
  )
}
