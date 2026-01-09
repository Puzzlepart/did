import { Tab, TabList } from '@fluentui/react-components'
import { useSubscriptionSettings } from 'AppContext'
import { FormControl } from 'components/FormControl'
import { TabComponent } from 'components/Tabs'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { getFluentIconWithFallback } from 'utils'
import { BasicInfo } from './BasicInfo'
import { BudgetTracking } from './BudgetTracking'
import { Resources } from './Resources'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'
import { RoleDefinitions } from './RoleDefinitions'

/**
 * ProjectForm component is used to create and edit projects.
 *
 * @category Projects
 */
export const ProjectForm: TabComponent<IProjectFormProps> = (props) => {
  const { t } = useTranslation()
  const { budgetTracking, projects } = useSubscriptionSettings()
  const { formControlProps } = useProjectForm(props)
  const [selectedTab, setSelectedTab] = useState<string>('general')

  const showTabs = budgetTracking?.enabled || projects?.enableResourceManagement

  const tabs = useMemo(
    () => [
      {
        value: 'general',
        label: t('common.general'),
        icon: 'Info',
        component: <BasicInfo />,
        visible: true
      },
      {
        value: 'roleDefinitions',
        label: t('projects.roleDefinitions.headerText'),
        icon: 'FabricUserFolder',
        component: <RoleDefinitions />,
        visible: !!projects?.enableProjectRoles
      },
      {
        value: 'resources',
        label: t('projects.resources.headerText'),
        icon: 'Group',
        component: <Resources />,
        visible: !!projects?.enableResourceManagement
      },
      {
        value: 'budget',
        label: t('projects.budget'),
        icon: 'LineChart',
        component: <BudgetTracking />,
        visible: !!budgetTracking?.enabled && formControlProps.isEditMode
      }
    ],
    [t, projects, budgetTracking, formControlProps.isEditMode]
  )

  const visibleTabs = tabs.filter((tab) => tab.visible)
  const selectedTabConfig = tabs.find((tab) => tab.value === selectedTab)

  return (
    <FormControl {...formControlProps}>
      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as string)}
        style={{
          paddingTop: showTabs ? 15 : 0,
          display: showTabs ? 'flex' : 'none'
        }}
      >
        {visibleTabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            icon={getFluentIconWithFallback(tab.icon)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {selectedTabConfig?.component}
    </FormControl>
  )
}

ProjectForm.displayName = 'ProjectForm'
ProjectForm.defaultProps = {
  refetch: () => {
    // Do nothing if not provided.
  },
  permission: PermissionScope.MANAGE_PROJECTS
}
