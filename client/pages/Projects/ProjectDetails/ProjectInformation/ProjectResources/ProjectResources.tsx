import { Persona } from '@fluentui/react-components'
import { InformationProperty } from 'components'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './ProjectResources.module.scss'
import { useProjectResources } from './useProjectResources'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

/**
 * Shows details about the selected project.
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
              <Persona
                primaryText={projectOwner.displayName}
                secondaryText='Prosjekteier'
                avatar={{
                  image: {
                    src: projectOwner.photo?.base64
                  }
                }}
              />
            )}
            {resources.map((resource, index) => (
              <Persona
                key={index}
                primaryText={resource.displayName}
                secondaryText={resource.projectRole}
                tertiaryText={
                  resource.hourlyRate &&
                  t('projects.hourlyRate', { rate: resource.hourlyRate })
                }
                avatar={{
                  image: {
                    src: resource.photo?.base64
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
      isDataLoaded={isDataLoaded}
    />
  )
}
