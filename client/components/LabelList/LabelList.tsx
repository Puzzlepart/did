import { EntityLabel } from 'components/EntityLabel'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './LabelList.module.scss'
import { ILabelListProps } from './types'

/**
 * Component for displaying a list of labels
 *
 * @category Reusable Component
 */
export const LabelList: ReusableComponent<ILabelListProps> = ({
  labels
}) => (
  <div className={LabelList.className }>
    {labels?.map((label) => (
      <EntityLabel key={label.name} label={label} />
    ))}
  </div>
)

LabelList.displayName = 'LabelList'
LabelList.className = styles.labelList
LabelList.defaultProps = {
  labels: []
}