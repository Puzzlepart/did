import { Checkbox, Label } from '@fluentui/react-components'
import { Panel } from 'components/Panel'
import React, { FC } from 'react'
import { useListContext } from '../context'

export const ViewColumnsPanel: FC = () => {
  const context = useListContext()
  return (
    <Panel
     open
     title='View Columns'
     description='Select columns to display in the list.'>
      <div style={{margin: '10px 0 0 0'}}>
      {context.props.columns.map((column) => (
        <div key={column.key}>
          <Checkbox
            checked={!column.data?.hidden}
          />
          <Label>{column.name}</Label>
        </div>
      ))}
      </div>
    </Panel>
  )
}
