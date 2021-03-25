/* eslint-disable tsdoc/syntax */
import { Icon, Link } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EditLink.module.scss'
import { IEditLinkProps } from './types'

/**
 * Renders a edit link using `<Icon />` and `<Link />`
 * from `@fluentui/react`
 *
 * @category Function Component
 */
export const EditLink: React.FC<IEditLinkProps> = (props) => {
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
