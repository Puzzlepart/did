import { EntityLabel } from 'components/EntityLabel'
import { TFunction } from 'i18next'
import { IProject } from 'interfaces'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { generateColumn as col } from 'utils/generateColumn'
import { getTheme } from 'office-ui-fabric-react/lib/Styling'

const theme = getTheme()

/**
 * Generate column definitions based on parameters specified
 * 
 * @param {string[]} hideColumns Columns to hide
 * @param {TFunction} t Translate function
 * 
 * @category ProjectList
 */
export default (hideColumns: string[], t: TFunction): IColumn[] => ([
    col(
        'icon',
        '',
        { maxWidth: 35, minWidth: 35 },
        (project: IProject) => {
            if (project.inactive) {
                return (
                    <Icon
                        title={t('inactiveText')}
                        iconName='Warning'
                        styles={{ root: { fontSize: 16, color: '#ffbf00' } }} />
                )
            }
            return <Icon iconName={project.icon || 'Page'} styles={{ root: { fontSize: 16 }}} style={{color: theme.palette.themePrimary}} />
        },
    ),
    col(
        'id',
        t('keyLabel', { ns: 'common' }),
        { maxWidth: 120 },
    ),
    col(
        'name',
        t('nameLabel', { ns: 'common' }),
        { maxWidth: 220 },
        (project: IProject) => <Link to={`/projects/${project.id}`} style={{color: theme.palette.themePrimary}}>{project.name}</Link>
    ),
    col(
        'customer',
        t('customer', { ns: 'common' }),
        { maxWidth: 220 },
        (project: IProject) => {
            if (!project.customer) return null
            return <Link to={`/customers/${project.customer.key}`} style={{color: theme.palette.themePrimary}}>{project.customer.name}</Link>
        }
    ),
    col(
        'labels',
        '',
        {},
        (project: IProject) => project.labels.map((label, idx) => (
            <EntityLabel key={idx} label={label} />
        )),
    )
].filter(col => hideColumns.indexOf(col.key) === -1))