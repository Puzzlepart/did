/* eslint-disable tsdoc/syntax */
import { List } from 'components'
import { Checkbox } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { contains, filter, isEmpty } from 'underscore'
import columns from './columns'
import { IProjectListProps } from './types'
import { useProjectList } from './useProjectList'

/**
 * Project list component used by `<Projects />`. Renders
 * projects in a list using our `<List />` component.
 * 
 * @category Projects
 */
export const ProjectList: FunctionComponent<IProjectListProps> = (
  props: IProjectListProps
) => {
  const {
    items,
    showInactive,
    setShowInactive,
    t
  } = useProjectList({ props })

  return (
    <List
      {...props}
      items={items}
      columns={columns(props, t).filter(
        (col) => !contains(props.hideColumns || [], col.key)
      )}
      groups={props.groups}
      selectionProps={props.selectionProps}
      commandBar={{
        items: [
          {
            key: 'TOGGLE_INACTIVE',
            onRender: () => (
              <Checkbox
                disabled={isEmpty(
                  filter(props.items, (index) => index.inactive)
                )}
                styles={{ root: { margin: '6px 0 0 8px' } }}
                checked={showInactive}
                label={t('common.toggleInactiveText')}
                onChange={(_event, checked) => setShowInactive(checked)}
              />
            )
          }
        ],
        farItems: []
      }}
    />
  )
}

export * from './types'
