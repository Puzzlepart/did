/* eslint-disable unicorn/prevent-abbreviations */
import { InputField } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ItemCell.module.scss'
import { renderValue } from './renderValue'
import { IItemCellProps } from './types'
import { useItemCell } from './useItemCell'

export const ItemCell: FC<IItemCellProps> = (props) => {
  const { t } = useTranslation()
  const { value, onChange, onEnter, inputWrapperRef } = useItemCell(props)
  return (
    <div className={styles.itemCell}>
      {props.isEditing ? (
        <div ref={inputWrapperRef}>
          <InputField
            {...props.field.props?.list}
            className={styles.input}
            value={value}
            onChange={onChange}
            onEnter={onEnter}
          />
        </div>
      ) : (
        <span
          className={styles.value}
          style={{ cursor: props.field.editable ? 'pointer' : 'default' }}
          onClick={() => {
            if (props.field.editable) {
              props.onToggleEdit()
            }
          }}
        >
          {renderValue(
            value,
            props.field.renderAs,
            props.field.defaultValue ?? t('common.notSet'),
            t
          )}
        </span>
      )}
    </div>
  )
}
