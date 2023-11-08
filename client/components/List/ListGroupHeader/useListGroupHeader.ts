import {
  IDetailsGroupDividerProps,
  IGroupHeaderProps,
  IGroupHeaderStyles,
  useTheme
} from '@fluentui/react'
import _ from 'lodash'
import { HTMLProps } from 'react'

/**
 * Hook that returns styles and event handlers for a list group header.
 *
 * @param props - The props object containing the group and onToggleCollapse function.
 */
export function useListGroupHeader(props: IDetailsGroupDividerProps) {
  const theme = useTheme()
  const { holiday = null, total = null, styles = {} } = { ...props.group?.data }

  const mergedStyles = _.merge(
    {
      title: {
        fontWeight: 'normal',
        color: holiday && theme.palette.red
      },
      expand: { cursor: 'pointer' }
    },
    styles
  ) as Partial<IGroupHeaderStyles>

  /**
   * Partial props for the `ListGroupHeader` component.
   */
  const groupHeaderProps: Partial<IGroupHeaderProps> = {
    ...props,
    group: {
      ...props.group,
      count: total ?? props.group?.count
    },
    styles: mergedStyles,
    onToggleCollapse: () => props.onToggleCollapse(props.group)
  }

  /**
   * Props for the container element of the `ListGroupHeader` component.
   */
  const containerProps: HTMLProps<HTMLDivElement> = {
    title: holiday?.name,
    onClick: () => props.onToggleCollapse(props.group)
  }

  return {
    groupHeaderProps,
    containerProps
  }
}
