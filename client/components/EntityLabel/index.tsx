/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { isBlank } from 'underscore.string'
import { getContrastColor } from 'utils'
import styles from './EntityLabel.module.scss'
import { IEntityLabelProps, LabelSize } from './types'

/**
 * @category Function Component
 */
export const EntityLabel: FunctionComponent<IEntityLabelProps> = ({
  size,
  label
}: IEntityLabelProps) => {
  const { t } = useTranslation()
  const className = [styles.root]
  const contrastColor = getContrastColor(label.color)
  let iconVerticalAlign = 'text-bottom'

  switch (size) {
    case LabelSize.xsmall:
      className.push(styles.sizeXSmall)
      break
    case LabelSize.medium:
      className.push(styles.sizeMedium)
      iconVerticalAlign = 'baseline'
      break
    case LabelSize.large:
      className.push(styles.sizeLarge)
      iconVerticalAlign = 'baseline'
      break
  }

  return (
    <div
      className={className.join(' ')}
      style={{ backgroundColor: label.color }}
      title={label.description}>
      {label.icon && (
        <Icon
          iconName={label.icon}
          style={{
            color: contrastColor,
            verticalAlign: iconVerticalAlign
          }}
        />
      )}
      <span className={styles.text} style={{ color: contrastColor }}>
        {isBlank(label.name) ? t('admin.defaultLabelTitle') : label.name}
      </span>
    </div>
  )
}

export * from './types'
