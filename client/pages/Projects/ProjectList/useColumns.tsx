import { CustomerLink } from 'components/CustomerLink'
import { EntityLabel } from 'components/EntityLabel'
import { IListColumn } from 'components/List/types'
import { Icon } from 'office-ui-fabric-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label, Project } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { NameLabel } from './NameLabel'
import { IProjectListProps } from './types'

/**
 * Returns column definitions
 */
export function useColumns(props: IProjectListProps): IListColumn[] {
  const { t } = useTranslation()
  return [
    col('icon', '', { minWidth: 125, maxWidth: 125 }, (project: Project) => {
      if (project.inactive) {
        return (
          <>
            <Icon
              title={t('projects.inactiveText')}
              iconName='Warning'
              styles={{ root: { fontSize: 16, color: '#ffbf00' } }}
            />
            <span style={{ marginLeft: 6, verticalAlign: 'top' }}>
              {project.key}
            </span>
          </>
        )
      }
      return (
        <>
          <Icon
            iconName={project.icon || 'Page'}
            styles={{ root: { fontSize: 16 } }}
          />
          <span style={{ marginLeft: 6, verticalAlign: 'top' }}>
            {project.key}
          </span>
        </>
      )
    }),
    col(
      'name',
      t('common.nameFieldLabel'),
      { maxWidth: 220 },
      (project: Project) => (
        <NameLabel project={project} renderLink={props.renderLink} />
      )
    ),
    col(
      'customer',
      t('common.customer'),
      { maxWidth: 220 },
      (project: Project) => {
        if (!project.customer) return null
        return <CustomerLink customer={project.customer} />
      }
    ),
    col('labels', '', {}, (project: Project) =>
      (project.labels as Label[]).map((label, index) => (
        <EntityLabel key={index} label={label} />
      ))
    )
  ].filter((col) => !(props.hideColumns || []).includes(col.key))
}
