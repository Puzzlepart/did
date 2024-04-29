/* eslint-disable unicorn/prevent-abbreviations */
import { List } from 'components'
import React, { FC } from 'react'
import { useListInputContext } from '../context'
import { ItemCell } from './ItemCell'

export const ItemsList: FC = () => {
  const context = useListInputContext()
  return (
    <List
      enableShimmer={!context.state.isDataLoaded}
      items={context.state.items}
      columns={context.props.fields.map((field) => ({
        key: field.key,
        fieldName: field.key,
        name: field.label,
        minWidth: 100,
        maxWidth: 150,
        onRender: (item, index) => (
          <ItemCell
            index={index}
            field={field}
            value={item[field.key]}
            onChange={() => {
              // TODO
            }}
          />
        )
      }))}
    />
  )
}
