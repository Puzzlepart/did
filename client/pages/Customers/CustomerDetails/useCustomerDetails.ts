import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { ListMenuItem } from 'components/List/ListToolbar'
import { TabItems } from 'components/Tabs'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Customer } from 'types'
import { ProjectList } from '../../Projects'
import { CustomersContext } from '../context'
import { CLOSE_PROJECT_PANEL, OPEN_PROJECT_PANEL } from '../reducer/actions'
import { CustomerInformation } from './CustomerInformation'
import $projects from './projects.gql'

/**
 * Handles fetching projects for the selected customer.
 *
 * @param customer - Selected customer
 * @param fetchPolicy - Fetch policy (default: `cache-and-network`)
 */
function useProjectsQuery(
  customer: Customer,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
) {
  const query = useQuery($projects, {
    variables: {
      customerKey: customer?.key
    },
    skip: !customer,
    fetchPolicy
  })
  const projects = useMemo(() => query?.data?.projects ?? [], [query])
  return [projects, query.loading, query.error, query.refetch] as const
}

export function useCustomerDetails() {
  const { t } = useTranslation()
  const context = useContext(CustomersContext)
  const selected = context.state.selected
  const [projects, loading, error, refetch] = useProjectsQuery(selected)
  const tabs: TabItems = useMemo(
    () => ({
      information: [
        CustomerInformation,
        { text: t('customers.informationHeaderText'), iconName: 'Info' }
      ],
      projects: [
        ProjectList,
        { text: t('customers.projectsHeaderText'), iconName: 'Collections' },
        {
          items: projects,
          hideColumns: ['customer'],
          enableShimmer: context.loading,
          searchBox: {
            placeholder: t('customers.searchProjectsPlaceholder', selected),
            disabled: context.loading
          },
          menuItems: [
            new ListMenuItem(t('customers.createProjectButtonLabel'))
              .withIcon('AddCircle')
              .setGroup('actions')
              .setOnClick(() => {
                context.dispatch(
                  OPEN_PROJECT_PANEL({
                    onSaveCallback: () => {
                      refetch()
                      context.dispatch(CLOSE_PROJECT_PANEL())
                    },
                    onDismissCallback: () =>
                      context.dispatch(CLOSE_PROJECT_PANEL())
                  })
                )
              })
          ]
        }
      ]
    }),
    [context.state, context.loading, selected, projects]
  )
  return {
    loading,
    error,
    tabs,
    selected
  } as const
}
