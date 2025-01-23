import { ISearchProjectProps } from 'components/SearchProject/types'
import { IProjectPickerControlProps } from './types'

/**
 * Hook for the `ProjectPickerControl` component.
 *
 * @param props Props for the `ProjectPickerControl` component.
 */
export function useProjectPickerControl(props: IProjectPickerControlProps) {
  const onSelected: ISearchProjectProps['onSelected'] = (project) => {
    props.model.set(props.name, project.tag)
  }
  return { onSelected }
}
