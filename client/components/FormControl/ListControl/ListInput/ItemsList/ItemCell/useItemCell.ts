import { IInputFieldProps } from 'components'
import { useRef, useState } from 'react'
import { useListInputContext } from '../../context'
import { IItemCellProps } from './types'
import { useOutsideAlerter } from 'hooks'

export function useItemCell(props: IItemCellProps) {
  const context = useListInputContext()
  const [value, setValue] = useState(props.value)

  const onChange: IInputFieldProps['onChange'] = (_, { value }) => {
    switch (props.field.type) {
      case 'number': {
        if (Number.isNaN(Number(value))) {
          return setValue(0)
        }
        return setValue(Number(value))
      }
      default: {
        setValue(value)
      }
    }
  }

  const onEnter: IInputFieldProps['onEnter'] = (_, event) => {
    event.stopPropagation()
    event.preventDefault()
    context.onUpdateItem(props.index, props.field, value)
    props.onToggleEdit()
  }

  const inputWrapperRef = useRef<HTMLDivElement>(null)

  useOutsideAlerter(inputWrapperRef, () => {
    setValue(props.value)
    props.onToggleEdit()
  })

  return { value, onChange, onEnter, inputWrapperRef }
}
