import {
  Caption2Strong,
  Link,
  Tooltip,
  mergeClasses
} from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './VersionInfo.module.scss'
import { useVersionInfo } from './useVersionInfo'

/**
 * Renders the version information of the application.
 * If DISPLAY_VERSION_DETAILS is set to '1', it displays a tooltip with commit, branch, and last commit details.
 * Otherwise, it displays only the version number.
 */
export const VersionInfo: StyledComponent = () => {
  const {
    displayVersionDetailsToooltip,
    hashShort,
    commitUrl,
    branch,
    branchUrl,
    lastCommitDatetime
  } = useVersionInfo()
  return displayVersionDetailsToooltip ? (
    <Tooltip
      withArrow
      relationship='description'
      content={
        <div className={styles.versionInfoTooltip}>
          <div hidden={!hashShort}>
            <b className={styles.infoLabel}>Commit:</b>
            <Link href={commitUrl} target='_blank'>
              <span>{hashShort}</span>
            </Link>
          </div>
          <div hidden={!branch}>
            <b className={styles.infoLabel}>Branch:</b>
            <Link href={branchUrl} target='_blank'>
              <span>{branch}</span>
            </Link>
          </div>
          <div hidden={!lastCommitDatetime}>
            <b className={styles.infoLabel}>Last commit:</b>
            <span>{lastCommitDatetime}</span>
          </div>
        </div>
      }
    >
      <Caption2Strong
        className={mergeClasses(VersionInfo.className, styles.detailsAvailable)}
      >{`v${VERSION}#${hashShort}`}</Caption2Strong>
    </Tooltip>
  ) : (
    <Caption2Strong
      className={VersionInfo.className}
    >{`v${VERSION}`}</Caption2Strong>
  )
}

VersionInfo.displayName = 'VersionInfo'
VersionInfo.className = styles.versionInfo
