import { useId } from '@fluentui/react-components'
import { IBasePanelAction } from 'components'
import { useMemo } from 'react'
import { IFormControlProps } from './types'

export function useFormControl(props: IFormControlProps) {
  const footerActions = useMemo<IBasePanelAction[]>(
    () => [
      {
        ...props.submitProps,
        hidden: !props.submitProps?.text,
        appearance: 'primary'
      }
    ],
    []
  )

  const contentId = useId('form-control-content')

  return { footerActions, contentId }
}
