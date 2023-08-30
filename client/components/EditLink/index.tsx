/* eslint-disable tsdoc/syntax */
import { Button } from '@fluentui/react-components'
import { PeopleEdit24Regular } from '@fluentui/react-icons'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EditLink.module.scss'
import { IEditLinkProps } from './types'

/**
 * Renders a edit link using `<Icon />` and `<Link />`
 * from `@fluentui/react`
 *
 * @category Reusable Component
 */
export const EditLink: FC<IEditLinkProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      <Button
        className={styles.root}
        onClick={props.onClick}
        appearance='subtle'
        icon={<PeopleEdit24Regular />}
      >
        <span className={styles.text}>{t('common.editLabel')}</span>
      </Button>
    </div>
  )
}
