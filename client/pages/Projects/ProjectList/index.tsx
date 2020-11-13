import List from 'components/List'
import { Checkbox } from 'office-ui-fabric'
import React, { useEffect, useState, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { contains, filter, isEmpty } from 'underscore'
import { withDefaultProps } from 'with-default-props'
import columns from './columns'
import { IProjectListProps } from './types'

const ProjectList: FunctionComponent<IProjectListProps> = (props: IProjectListProps) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([...props.items])
  const [showInactive, setShowInactive] = useState(false)

  useEffect(() => setItems([...props.items].filter((p) => (showInactive ? true : !p.inactive))), [
    props.items,
    showInactive
  ])

  return (
    <List
      {...props}
      items={items}
      columns={columns(props, t).filter((col) => !contains(props.hideColumns, col.key))}
      groups={props.groups}
      selection={props.selection}
      commandBar={{
        items: [
          {
            key: 'TOGGLE_INACTIVE',
            onRender: () => (
              <Checkbox
                disabled={isEmpty(filter(items, i => i.inactive))}
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

export default withDefaultProps(ProjectList, { items: [], hideColumns: [] })
