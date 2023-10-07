import { Link, Tooltip } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './VersionInfo.module.scss'

export const VersionInfo: StyledComponent = () => {
    return (
        <Tooltip
            relationship='description'
            content={DISPLAY_VERSION_DETAILS === '1' && (
                <div className={styles.versionInfoTooltip}>
                    <div>
                        <b className={styles.infoLabel}>Commit:</b><Link href={COMMIT_URL} target='_blank'><span>{COMMIT_HASH}</span></Link>
                    </div>
                    <div>
                        <b className={styles.infoLabel}>Branch:</b><Link href={BRANCH_URL} target='_blank'><span>{BRANCH}</span></Link>
                    </div>
                    <div>
                        <b className={styles.infoLabel}>Last commit:</b><span>{new Date(LAST_COMMIT_DATETIME).toLocaleString()}</span>
                    </div>
                </div>
            )}>
            <div className={VersionInfo.className}>{`v${VERSION}`}</div>
        </Tooltip>
    )
}

VersionInfo.displayName = 'VersionInfo'
VersionInfo.className = styles.versionInfo