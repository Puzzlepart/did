import { Tabs } from 'components/Tabs'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectsContext } from './context'
import { ProjectDetails } from './ProjectDetails'
import { ProjectForm } from './ProjectForm'
import { ProjectList } from './ProjectList'
import { CLOSE_EDIT_PANEL } from './reducer'
import { useProjects } from './useProjects'

/**
 * @category Function Component
 */
export const Projects: FC = () => {
  const { t } = useTranslation()
  const { context, renderDetails, defaultTab } = useProjects()

  return (
    <ProjectsContext.Provider value={{ ...context }}>
      {renderDetails ? (
        <ProjectDetails />
      ) : (
        <Tabs
          defaultSelectedValue={defaultTab}
          items={{
            s: [
              ProjectList,
              t('common.search'),
              {
                enableShimmer: context.loading,
                searchBox: {
                  placeholder: t('common.searchPlaceholder')
                }
              }
            ],
            m: [
              ProjectList,
              t('projects.myProjectsText'),
              {
                searchBox: {
                  placeholder: t('projects.myProjectsSearchPlaceholder')
                }
              }
            ],
            new: [ProjectForm, t('projects.createNewText')]
          }}
        />
      )}
      <ProjectForm
        edit={{ ...context.state.editProject }}
        panel={{
          open: !!context.state.editProject,
          title: context.state.editProject?.name,
          onDismiss: () => context.dispatch(CLOSE_EDIT_PANEL())
        }}
        refetch={context.refetch}
      />
    </ProjectsContext.Provider>
  )
}
