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
  onClick
}: IDeleteLinkProps) => {
  const { t } = useTranslation()
  return (
    <div hidden={hidden}>
      <Link className={styles.root} onClick={onClick}>
        {iconName && <Icon className={styles.icon} iconName={iconName} />}
        <span className={styles.text}>{t('common.delete')}</span>
      </Link>
    </div>
  )
}
