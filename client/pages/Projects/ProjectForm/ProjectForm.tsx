import { Tab, TabList } from '@fluentui/react-components'
import { useSubscriptionSettings } from 'AppContext'
import { FormControl } from 'components/FormControl'
import { TabComponent } from 'components/Tabs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { getFluentIcon } from 'utils'
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
        <Tab value='general' icon={getFluentIcon('Info')}>
          {t('common.general')}
        </Tab>
        {projects?.enableProjectRoles && (
          <Tab value='roleDefinitions' icon={getFluentIcon('FabricUserFolder')}>
            {t('projects.roleDefinitions.headerText')}
          </Tab>
        )}
        {projects?.enableResourceManagement && (
          <Tab value='resources' icon={getFluentIcon('Group')}>
            {t('projects.resources.headerText')}
          </Tab>
        )}
        {budgetTracking?.enabled && formControlProps.isEditMode && (
          <Tab value='budget' icon={getFluentIcon('LineChart')}>
            {t('projects.budget')}
          </Tab>
        )}
      </TabList>

      {selectedTab === 'general' && <BasicInfo />}
      {selectedTab === 'roleDefinitions' && projects?.enableProjectRoles && (
        <RoleDefinitions />
      )}
      {selectedTab === 'resources' && projects?.enableResourceManagement && (
        <Resources />
      )}
      {selectedTab === 'budget' &&
        budgetTracking?.enabled &&
        formControlProps.isEditMode && <BudgetTracking />}
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
