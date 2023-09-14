import { Button } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import styles from './DeleteLink.module.scss'
import { IDeleteLinkProps } from './types'
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
        className={DeleteLink.className}
        onClick={props.onClick}
        disabled={props.disabled}
        appearance='subtle'
        icon={icon('Delete')}
      >
        <span className={styles.text}>{t('common.delete')}</span>
      </Button>
    </div>
  )
}

DeleteLink.className = styles.deleteLink
DeleteLink.defaultProps = {
  style: {}
}
