/* eslint-disable tsdoc/syntax */
import { Icon, Link } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './DisableLink.module.scss'
import { IDisableLinkProps } from './types'

/**
 * @category Function Component
 */
export const DisableLink = ({
  iconName = 'EmojiDisappointed',
  hidden,
  style,
  disabled,
  onClick
}: IDisableLinkProps) => {
  const { t } = useTranslation()
  return (
    <div hidden={hidden} style={{ ...style, opacity: disabled ? 0.2 : 1 }}>
      <Link className={styles.root} onClick={onClick} disabled={disabled}>
        {iconName && <Icon className={styles.icon} iconName={iconName} />}
        <span className={styles.text}>{t('common.disable')}</span>
      </Link>
    </div>
  )
}
