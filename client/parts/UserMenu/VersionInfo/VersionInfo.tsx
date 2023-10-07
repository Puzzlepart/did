import { Caption2Strong, Link, Tooltip, mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './VersionInfo.module.scss'

export const VersionInfo: StyledComponent = () => {
    const displayVersionDetailsToooltip = DISPLAY_VERSION_DETAILS === '1'
    return displayVersionDetailsToooltip
        ? (
            <Tooltip
                withArrow
                relationship='description'
                content={(
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
                <Caption2Strong className={mergeClasses(VersionInfo.className, styles.detailsAvailable)}>{`v${VERSION}`}</Caption2Strong>
            </Tooltip>
        )
        : (
            <Caption2Strong className={VersionInfo.className}>{`v${VERSION}`}</Caption2Strong>
        )
}

VersionInfo.displayName = 'VersionInfo'
VersionInfo.className = styles.versionInfo