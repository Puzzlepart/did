import { useSubscriptionSettings } from 'AppContext'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { IProjectsContext } from './context'
import { useProjectsReducer } from './reducer'
import { IProjectsUrlParameters } from './types'
import { useProjectsQuery } from './useProjectsQuery'
import { IProjectListProps } from './ProjectList'

/**
 * Component logic for `Projects`. Setting up the `reducer` and `query` for the component,
 * aswell as the `context` object that will be passed down to the children. Also handling
 * the default tab to be shown based on the subscription setting `projects.showMyProjectsByDefault`.
 */
export function useProjects() {
  const { t } = useTranslation()
  const urlParameters = useParams<IProjectsUrlParameters>()
  const showMyProjectsByDefault = useSubscriptionSettings(
    'projects.showMyProjectsByDefault'
  )
  const [state, dispatch] = useProjectsReducer()
  const query = useProjectsQuery(dispatch)
  const context = useMemo<IProjectsContext>(
    () => ({
      ...query,
      state,
      dispatch
    }),
    [state, query.loading]
  )
  const renderDetails =
    urlParameters.currentTab?.includes('_') || Boolean(state.selected)
  const defaultTab = showMyProjectsByDefault ? 'm' : 's'

  /**
   * Creates properties for a `ProjectList` based on the specified type.
   *
   * @param type - The type of project list, either 'm' for "my projects" or 's' for "all projects".
   * @returns An object containing properties for the project list.
   *
   * @remarks
   * The returned object includes:
   * - `getKey`: A function to get the key for each item in the list.
   * - `enableShimmer`: A boolean indicating whether to show a loading shimmer, based on the loading state from context.
   * - `searchBox`: An object with properties for the search box, including:
   *   - `persist`: A boolean indicating whether the search box should persist.
   *   - `disabled`: A boolean indicating whether the search box should be disabled, based on the loading state from context.
   *   - `placeholder`: A function to get the placeholder text for the search box, based on the type and the number of original items in the state.
   */
  const createListProps = (type: 'm' | 's'): IProjectListProps => {
    const placeholder: IProjectListProps['searchBox']['placeholder'] = state => {
      return type === 'm'
        ? t('projects.myProjectsSearchPlaceholder', {
          count: state.origItems?.length ?? 0
        })
        : t('projects.searchPlaceholder', {
          count: state.origItems?.length ?? 0
        })
    }
    return {
      getKey: (item) => item?.tag,
      enableShimmer: context.loading,
      searchBox: {
        persist: true,
        disabled: context.loading,
        placeholder
      }
    } as IProjectListProps
  }

  return { t, context, renderDetails, defaultTab, createListProps }
}
