import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProjectColumn.module.scss'
import { IClearManualMatchButtonProps } from './types'

/**
 * @category Timesheet
 */
export const ClearManualMatchButton = ({ onClick }: IClearManualMatchButtonProps): JSX.Element => {
    const { t } = useTranslation('timesheet')
    return (
        <div
            className={styles.clearButton}
            title={t('clearProjectMatchTooltipText')}>
            <span onClick={onClick} style={{ cursor: 'pointer' }}>
                <Icon iconName='Cancel' styles={{ root: { fontSize: 14 } }} />
            </span>
        </div>
    )
}
