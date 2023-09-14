import { Tabs } from 'components/Tabs'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import { ProjectForm } from './ProjectForm'
import { ProjectList } from './ProjectList'
import { useProjects } from './useProjects'

/**
 * @category Function Component
 */
export const Projects: FC = () => {
  const { t } = useTranslation()
  const { listProps, context, renderDetails } = useProjects()

  return (
    <ProjectsContext.Provider value={{ ...context, listProps }}>
      {renderDetails ? (
        <ProjectDetails />
      ) : (
        <Tabs
          items={{
            s: [ProjectList, t('common.search')],
            m: [ProjectList, t('projects.myProjectsText')],
            new: [ProjectForm, t('projects.createNewText')]
          }}
        ></Tabs>
      )}
    </ProjectsContext.Provider>
  )
}
