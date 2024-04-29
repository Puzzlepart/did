/* eslint-disable unicorn/prevent-abbreviations */
import { InputField } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ItemCell.module.scss'
import { IItemCellProps } from './types'
import { renderValue } from './renderValue'
import { useItemCell } from './useItemCell'

export const ItemCell: FC<IItemCellProps> = (props) => {
  const { t } = useTranslation()
  const { value, onChange, editing } = useItemCell(props)
  return (
    <div className={styles.itemCell}>
      {editing.value ? (
        <InputField
          className={styles.input}
          value={value}
          onChange={onChange}
          onEnter={() => {
            props.onChange(value)
            editing.toggle()
          }}
        />
      ) : (
        <span className={styles.value} onClick={editing.toggle}>
          {renderValue(value, props.field.renderAs, t('common.notSet'))}
        </span>
      )}
    </div>
  )
}
