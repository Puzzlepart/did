import { IInputFieldProps } from 'components'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { IUserMetadataCellProps } from './types'

export function useUserMetadataCell(props: IUserMetadataCellProps) {
  const [value, setValue] = useState(props.user[props.id])
  const editing = useBoolean(false)

  const onChange: IInputFieldProps['onChange'] = (_, { value }) => {
    setValue(props.field.type === 'number' ? Number(value) : value)
  }

  return { value, onChange, editing }
}
