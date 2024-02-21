import { ReactElement, useEffect, useMemo, useState } from 'react'
import { getFluentIconWithFallback } from 'utils'
import { IDynamicSearchBoxProps } from './types'

export function useDynamicSearchBox(props: IDynamicSearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const value = useMemo(
    () => props.value ?? searchTerm,
    [props.value, searchTerm]
  )

  useEffect(() => {
    props.onChange(searchTerm.toLowerCase())
  }, [searchTerm])

  let contentBefore: ReactElement
  if (props.iconName) {
    contentBefore = getFluentIconWithFallback(props.iconName)
  }

  return { setSearchTerm, value, contentBefore }
}
