/* eslint-disable tsdoc/syntax */
import { Icon, Link } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EditLink.module.scss'
import { IEditLinkProps } from './types'

/**
 * @category Function Component
 */
export const EditLink = ({ iconName, hidden, onClick }: IEditLinkProps) => {
  const { t } = useTranslation()
  return (
    <div hidden={hidden}>
      <Link className={styles.root} onClick={onClick}>
        {iconName && <Icon className={styles.icon} iconName={iconName} />}
        <span className={styles.text}>{t('common.editLabel')}</span>
      </Link>
    </div>
  )
}
