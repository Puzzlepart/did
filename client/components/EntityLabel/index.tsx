import { Icon } from 'office-ui-fabric'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { isBlank } from 'underscore.string'
import styles from './EntityLabel.module.scss'
import { IEntityLabelProps } from './types'

export const EntityLabel = ({ size, label }: IEntityLabelProps) => {
  const { t } = useTranslation()
  const className = [styles.root]
  // eslint-disable-next-line default-case
  switch (size) {
    case 'xsmall':
      className.push(styles.sizeXSmall)
      break
    case 'medium':
      className.push(styles.sizeMedium)
      break
    case 'large':
      className.push(styles.sizeLarge)
      break
  }

  return (
    <div className={className.join(' ')} style={{ backgroundColor: label.color }} title={label.description}>
      {label.icon && <Icon iconName={label.icon} className={styles.icon} />}
      <span className={styles.text}>{isBlank(label.name) ? t('admin.defaultLabelTitle') : label.name}</span>
    </div>
  )
}
