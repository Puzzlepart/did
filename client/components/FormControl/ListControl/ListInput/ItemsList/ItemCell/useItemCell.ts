import { IInputFieldProps } from 'components'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { IItemCellProps } from './types'

export function useItemCell(props: IItemCellProps) {
  const [value, setValue] = useState(props.value)
  const editing = useBoolean(false)

  const onChange: IInputFieldProps['onChange'] = (_, { value }) => {
    setValue(props.field.type === 'number' ? Number(value) : value)
  }

  return { value, onChange, editing }
}
