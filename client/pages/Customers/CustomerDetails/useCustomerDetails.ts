import { useQuery } from '@apollo/client'
import { TabItems } from 'components/Tabs'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectList } from '../../Projects'
import { CustomersContext } from '../context'
import { CustomerInformation } from './CustomerInformation'
import $projects from './projects.gql'

export function useCustomerDetails() {
  const { t } = useTranslation()
  const { state, loading } = useContext(CustomersContext)
  const selected = state.selected
  const query = useQuery($projects, {
    variables: {
      customerKey: selected?.key
    },
    skip: !selected
  })
  const projects = query?.data?.projects ?? []
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
          enableShimmer: loading,
          searchBox: {
            placeholder: t('customers.searchProjectsPlaceholder', selected),
            disabled: loading
          }
        }
      ]
    }),
    [state, loading, selected]
  )
  return {
    ...query,
    tabs
  } as const
}
