/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isBlank } from 'underscore.string'
import { getContrastColor } from 'utils'
import styles from './EntityLabel.module.scss'
import { IEntityLabelProps } from './types'

/**
 * The `<EntityLabel />` component is used to add contextual metadata
 * to a design. Visually it styles text, adds padding, and rounded corners.
 *
 * Uses styles from `@primer/css`
 *
 * @see https://primer.style/components/Label
 *
 * @category Function Component
 */
export const EntityLabel: React.FC<IEntityLabelProps> = ({
  label
}: IEntityLabelProps) => {
  const { t } = useTranslation()
  const contrastColor = getContrastColor(label.color)

  return (
    <div
      className={styles.root}
      style={{ backgroundColor: label.color }}
      title={label.description}>
      {label.icon && (
        <Icon
          iconName={label.icon}
          style={{
            color: contrastColor,
            marginRight: 6
          }}
        />
      )}
      <span style={{ color: contrastColor }}>
        {isBlank(label.name) ? t('admin.defaultLabelTitle') : label.name}
      </span>
    </div>
  )
}

export * from './types'
