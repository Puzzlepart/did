/* eslint-disable tsdoc/syntax */
import { Icon, Link } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EditLink.module.scss'
import { IEditLinkProps } from './types'

/**
 * @category Function Component
 */
export const EditLink = (props: IEditLinkProps) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      <Link className={styles.root} onClick={props.onClick}>
        {props.iconName && (
          <Icon className={styles.icon} iconName={props.iconName} />
        )}
        <span className={styles.text}>{t('common.editLabel')}</span>
      </Link>
    </div>
  )
}
