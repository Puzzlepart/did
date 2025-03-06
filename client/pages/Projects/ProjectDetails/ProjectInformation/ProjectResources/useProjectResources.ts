import { useExtension } from 'hooks'
import { Project } from 'types'
import { Resources } from '../../../ProjectForm'
import { ResourcesExtension } from '../../../ProjectForm/Resources/types'
import { useProjectsContext } from '../../../context'
import { useUsersQuery } from './useUsersQuery'

/**
 * Component logic hook for `ProjectResources` component. Handles the logic around
 * fetching and displaying project resources.
 */
export const useProjectResources = () => {
  const context = useProjectsContext()
  const { users, isDataLoaded } = useUsersQuery()

  const resourcesExtension = useExtension<Project, ResourcesExtension>(
    context.state.selected,
    Resources.extensionId,
    undefined,
    {
      projectOwner: null,
      resources: []
    },
    true
  )

  const projectOwner = users.find(
    ({ id }) => id === resourcesExtension.projectOwner
  )
  const resources = resourcesExtension.resources
    .map((resource) => ({
      ...resource,
      ...users?.find((user: any) => user.id === resource.id)
    }))
    .filter(Boolean)

  return {
    projectOwner,
    resources,
    isDataLoaded
  }
}
