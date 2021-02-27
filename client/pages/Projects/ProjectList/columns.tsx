import { CustomerLink } from 'components/CustomerLink'
import { EntityLabel } from 'components/EntityLabel'
import { TFunction } from 'i18next'
import { IColumn, Icon } from 'office-ui-fabric-react'
import * as React from 'react'
import { LabelObject as Label, Project } from 'types'
import { generateColumn as col } from 'utils/generateColumn'
import { NameLabel } from './NameLabel'
import { IProjectListProps } from './types'

/**
 * Generate column definitions based on parameters specified
 *
 * @param props - Props
 * @param t - Translate function
 */
export default (props: IProjectListProps, t: TFunction): IColumn[] =>
  [
    col('icon', '', { maxWidth: 35, minWidth: 35 }, (project: Project) => {
      if (project.inactive) {
        return (
          <Icon
            title={t('projects.inactiveText')}
            iconName='Warning'
            styles={{ root: { fontSize: 16, color: '#ffbf00' } }}
          />
        )
      }
      return (
        <Icon
          iconName={project.icon || 'Page'}
          styles={{ root: { fontSize: 16 } }}
        />
      )
    }),
    col('key', t('common.keyFieldLabel'), { maxWidth: 120 }),
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
      (project.labels as Label[]).map((label, idx) => (
        <EntityLabel key={idx} label={label} />
      ))
    )
  ].filter((col) => props.hideColumns.indexOf(col.key) === -1)
