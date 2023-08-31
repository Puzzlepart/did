import { List, TabComponent } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import React from 'react'
import { IProjectListProps } from './types'
import { useProjectList } from './useProjectList'

// TODO: Add TOGGLE_INACTIVE action to menuItems

// commandBar={{
//   items: [
//     {
//       key: 'TOGGLE_INACTIVE',
//       onRender: () => (
//         <div
//           hidden={
//             isMobile || !_.any(props.items, (index) => index.inactive)
//           }
//         >
//           <Checkbox
//             disabled={_.isEmpty(
//               _.filter(props.items, (index) => index.inactive)
//             )}
//             styles={{ root: { margin: '6px 0 0 8px' } }}
//             checked={showInactive}
//             label={t('common.toggleInactiveText')}
//             onChange={(_event, checked) => setShowInactive(checked)}
//           />
//         </div>
//       )
//     }
//   ],
//   farItems: []
// }}

/**
 * Project list component used by `<Projects />`. Renders
 * projects in a list using our `<List />` component.
 *
 * @category Projects
 */
export const ProjectList: TabComponent<IProjectListProps> = (props) => {
  const { items, columns } = useProjectList(props)
  return (
    <>
      <List
        {...props}
        items={items}
        columns={columns}
        groups={props.groups}
        selectionProps={props.selectionProps}
        menuItems={[new ListMenuItem().setDisabled(true)]}
      />
      {props.children}
    </>
  )
}

export * from './types'
