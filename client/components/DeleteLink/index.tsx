/* eslint-disable tsdoc/syntax */
import { Icon, Link } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './DeleteLink.module.scss'
import { IDeleteLinkProps } from './types'

/**
 * @category Function Component
 */
export const DeleteLink = ({
  iconName = 'Delete',
  hidden,
  style,
  disabled,
  onClick
}: IDeleteLinkProps) => {
  const { t } = useTranslation()
  return (
    <div hidden={hidden} style={{ ...style, opacity: disabled ? 0.2 : 1 }}>
      <Link className={styles.root} onClick={onClick} disabled={disabled}>
        {iconName && <Icon className={styles.icon} iconName={iconName} />}
        <span className={styles.text}>{t('common.delete')}</span>
      </Link>
    </div>
  )
}
