/* eslint-disable tsdoc/syntax */
import { Button } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import styles from './EditLink.module.scss'
import { IEditLinkProps } from './types'

/**
 * Renders a edit link using `<Button />` component from `@fluentui/react-components`
 *
 * @category Reusable Component
 */
export const EditLink: ReusableComponent<IEditLinkProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      <Button
        className={EditLink.className}
        onClick={props.onClick}
        appearance='subtle'
        icon={icon('PeopleEdit')}
      >
        <span className={styles.text}>{t('common.editLabel')}</span>
      </Button>
    </div>
  )
}

EditLink.className = styles.editLink
