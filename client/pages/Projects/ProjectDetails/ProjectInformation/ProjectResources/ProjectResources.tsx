import { InformationProperty, UserColumn } from 'components'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './ProjectResources.module.scss'
import { useProjectResources } from './useProjectResources'

/**
 * Shows the project resources, including the project owner 
 * and other resources for the project.
 *
 * @category Projects
 */
export const ProjectResources: StyledComponent = () => {
  const { projectOwner, resources, isDataLoaded } = useProjectResources()
  const { t } = useTranslation()
  if (!projectOwner && _.isEmpty(resources)) {
    return null
  }
  return (
    <InformationProperty
      title={t('projects.resourcesLabel')}
      onRenderValue={() => (
        <div className={styles.projectResources}>
          <div className={styles.container}>
            {projectOwner && (
              <UserColumn user={projectOwner} role={{ name: t('projects.projectOwner') }} />
            )}
            {resources.map((resource, index) => (
              <UserColumn
                key={index}
                user={resource}
                role={{ name: resource.projectRole, hourlyRate: resource.hourlyRate }} />
            ))}
          </div>
        </div>
      )}
      isDataLoaded={isDataLoaded}
    />
  )
}
