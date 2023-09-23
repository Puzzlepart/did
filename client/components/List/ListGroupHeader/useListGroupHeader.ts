import {
  IDetailsGroupDividerProps,
  IGroupHeaderStyles,
  useTheme
} from '@fluentui/react'

/**
 * Hook that returns styles and event handlers for a list group header.
 *
 * @param props - The props object containing the group and onToggleCollapse function.
 */
export function useListGroupHeader({
  group,
  onToggleCollapse
}: IDetailsGroupDividerProps) {
  const theme = useTheme()
  const { holiday } = group?.data ?? {}
  const styles: Partial<IGroupHeaderStyles> = {
    title: {
      fontWeight: 'normal',
      color: holiday && theme.palette.red
    },
    expand: { cursor: 'pointer' },
    headerCount: { display: 'none' }
  }
  return {
    styles,
    title: holiday?.name,
    onClick: () => onToggleCollapse(group)
  }
}
