import { ListMenuItem, TabItems } from 'components'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectList } from '../../Projects'
import { CustomersContext } from '../context'
import { CLOSE_PROJECT_PANEL, OPEN_PROJECT_PANEL } from '../reducer/actions'
import { useProjectsQuery } from './useProjectsQuery'
import { usePartnerProjectsQuery } from './usePartnerProjectsQuery'

export function useCustomerDetails() {
  const { t } = useTranslation()
  const context = useContext(CustomersContext)
  const selected = context.state.selected
  const [projects, { error, refetch }] = useProjectsQuery(selected)
  const [partnerProjects, { error: partnerError, refetch: refetchPartner }] = usePartnerProjectsQuery(selected)
  const tabs: TabItems = useMemo(() => {
    const base: TabItems = {
      projects: [
        ProjectList,
        { text: t('customers.projectsHeaderText'), iconName: 'Collections' },
        {
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
                    onDismissCallback: () =>
                      context.dispatch(CLOSE_PROJECT_PANEL())
                  })
                )
              })
          ]
        }
      ]
    }

    // Only include the partner tab if there is at least one partner project (and not loading initial state)
    if (!context.loading && partnerProjects?.length > 0) {
      base.partner = [
        ProjectList,
        { text: t('customers.partnerProjectsHeaderText'), iconName: 'PeopleTeam' },
        {
          hideColumns: ['customer'],
          enableShimmer: context.loading,
          overrideItems: partnerProjects,
          searchBox: {
            placeholder: t('customers.searchPartnerProjectsPlaceholder', selected),
            disabled: context.loading
          }
        }
      ]
    }
    return base
  }, [context.loading, context.state, partnerProjects, selected])
  return { projects, partnerProjects, error: error || partnerError, tabs, refetch: () => { refetch(); refetchPartner(); } }
}
