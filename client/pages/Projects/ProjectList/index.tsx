import List from 'components/List'
import { Checkbox, CheckboxVisibility, ContextualMenuItemType, SearchBox } from 'office-ui-fabric'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { contains, filter, isEmpty } from 'underscore'
import { withDefaultProps } from 'with-default-props'
import columns from './columns'
import { IProjectListProps } from './types'

const ProjectList: FunctionComponent<IProjectListProps> = (
  props: IProjectListProps
) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([...props.items])
  const [showInactive, setShowInactive] = useState(false)

  useEffect(
    () =>
      setItems(
        [...props.items].filter((p) => (showInactive ? true : !p.inactive))
      ),
    [props.items, showInactive]
  )

  return (
    <List
      {...props}
      items={items}
      columns={columns(props, t).filter(
        (col) => !contains(props.hideColumns, col.key)
      )}
      groups={props.groups}
      selection={props.selection}
      checkboxVisibility={CheckboxVisibility.always}
      commandBar={{
        items: [
          {
            key: 'TOGGLE_INACTIVE',
            onRender: () => (
              <Checkbox
                disabled={isEmpty(filter(props.items, (i) => i.inactive))}
                styles={{ root: { margin: '6px 0 0 8px' } }}
                checked={showInactive}
                label={t('common.toggleInactiveText')}
                onChange={(_event, checked) => setShowInactive(checked)}
              />
            )
          }
        ],
        farItems: [
          {
            key: 'LAasf',
            name: 'Label',
            subMenuProps: {
              items: [
                {
                  key: '01',
                  text: 'Apply labels',
                  itemType: ContextualMenuItemType.Header
                },
                {
                  key: '02',
                  onRender: () => (
                    <div style={{ padding: 8 }}>
                      <SearchBox placeholder='Filter labels...' />
                    </div>
                  )
                },
                {
                  key: '03',
                  onRender: () => (
                    <div style={{ padding: 8, display: 'flex' }}>
                      <div style={{ marginTop: 2, width: 14, height: 14, borderRadius: 10, backgroundColor: 'rgb(238, 210, 243)' }}>

                      </div>
                      <div style={{ paddingLeft: 8 }}>
                        Internal system
                      </div>
                    </div>
                  )
                },
                {
                  key: '04',
                  onRender: () => (
                    <div style={{ padding: 8, display: 'flex' }}>
                      <div style={{ marginTop: 2, width: 14, height: 14, borderRadius: 10, backgroundColor: 'rgb(248, 231, 28)' }}>

                      </div>
                      <div style={{ paddingLeft: 8 }}>
                        Crayon timereg
                      </div>
                    </div>
                  )
                }
              ]
            }
          }
        ]
      }}
    />
  )
}

export default withDefaultProps(ProjectList, {
  items: [],
  hideColumns: []
})
