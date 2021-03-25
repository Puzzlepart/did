/* eslint-disable tsdoc/syntax */
import { List, TabComponent } from 'components'
import { Checkbox } from '@fluentui/react'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { filter, isEmpty } from 'underscore'
import { IProjectListProps } from './types'
import { useProjectList } from './useProjectList'

/**
 * Project list component used by `<Projects />`. Renders
 * projects in a list using our `<List />` component.
 *
 * @category Projects
 */
export const ProjectList: TabComponent<IProjectListProps> = (props) => {
  const { t } = useTranslation()
  const { items, columns, showInactive, setShowInactive } = useProjectList(
    props
  )
  return (
    <>
      <List
        {...props}
        items={items}
        columns={columns}
        groups={props.groups}
        selectionProps={props.selectionProps}
        commandBar={{
          items: [
            {
              key: 'TOGGLE_INACTIVE',
              onRender: () => (
                <div hidden={isMobile}>
                  <Checkbox
                    disabled={isEmpty(
                      filter(props.items, (index) => index.inactive)
                    )}
                    styles={{ root: { margin: '6px 0 0 8px' } }}
                    checked={showInactive}
                    label={t('common.toggleInactiveText')}
                    onChange={(_event, checked) => setShowInactive(checked)}
                  />
                </div>
              )
            }
          ],
          farItems: []
        }}
      />
      {props.children}
    </>
  )
}

export * from './types'
