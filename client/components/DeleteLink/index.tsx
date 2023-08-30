import { Button } from '@fluentui/react-components'
import {
  bundleIcon,
  Delete24Filled,
  Delete24Regular
} from '@fluentui/react-icons'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './DeleteLink.module.scss'
import { IDeleteLinkProps } from './types'

const Icon = bundleIcon(Delete24Filled, Delete24Regular)

/**
 * Renders a delete link using `<Button />` component from `@fluentui/react-components`
 *
 * @category Reusable Component
 */
export const DeleteLink: ReusableComponent<IDeleteLinkProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div
      hidden={props.hidden}
      style={{ ...props.style, opacity: props.disabled ? 0.2 : 1 }}
    >
      <Button
        className={styles.root}
        onClick={props.onClick}
        disabled={props.disabled}
        appearance='subtle'
        icon={<Icon />}
      >
        <span className={styles.text}>{t('common.delete')}</span>
      </Button>
    </div>
  )
}

DeleteLink.defaultProps = {
  style: {}
}
