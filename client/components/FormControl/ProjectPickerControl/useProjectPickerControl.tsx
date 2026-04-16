/* eslint-disable unicorn/prevent-abbreviations */
import { ISearchProjectProps } from 'components/SearchProject/types'
import { IProjectPickerControlProps } from './types'

/**
 * Hook for the `ProjectPickerControl` component.
 *
 * @param props Props for the `ProjectPickerControl` component.
 */
export function useProjectPickerControl(props: IProjectPickerControlProps) {
  const onSelected: ISearchProjectProps['onSelected'] = (project) => {
    if (props.multiple) {
      const value = props.transformValue
        ? props.transformValue(project)
        : (project?.tag ?? null)
      const current = props.model.value(props.name) ?? []
      const values = Array.isArray(current) ? current : []
      if (value && !values.includes(value)) {
        props.model.set(props.name, [...values, value])
      }
    } else {
      props.model.set(props.name, project?.tag ?? null)
    }
  }

  const onRemove = (valueToRemove: string) => {
    const current = props.model.value(props.name) ?? []
    const values = Array.isArray(current) ? current : []
    props.model.set(
      props.name,
      values.filter((v: string) => v !== valueToRemove)
    )
  }

  const filterFunc: ISearchProjectProps['filterFunc'] = (project) => {
    return (
      project?.customer?.key === props.model.value('customerKey') ||
      project?.customerKey === props.model.value('customerKey')
    )
  }
  return { onSelected, onRemove, filterFunc }
}
