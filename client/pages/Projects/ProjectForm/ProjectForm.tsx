import { Pivot, PivotItem } from '@fluentui/react'
import { useSubscriptionSettings } from 'AppContext'
import { FormControl } from 'components/FormControl'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
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
  return (
    <FormControl {...formControlProps}>
      <Pivot
        styles={{
          link: {
            display:
              budgetTracking?.enabled || projects.enableResourceManagement
                ? 'initial'
                : 'none'
          },
          itemContainer: {
            paddingTop:
              budgetTracking?.enabled || projects.enableResourceManagement
                ? 15
                : 0
          }
        }}
      >
        <PivotItem
          headerText={t('common.general')}
          itemIcon='Info'
          itemKey='general'
        >
          <BasicInfo />
        </PivotItem>
        {projects?.enableProjectRoles && (
          <PivotItem
            headerText={t('projects.roleDefinitions.headerText')}
            itemIcon='FabricUserFolder'
            itemKey='roleDefinitions'
          >
            <RoleDefinitions />
          </PivotItem>
        )}
        {projects?.enableResourceManagement && (
          <PivotItem
            headerText={t('projects.resources.headerText')}
            itemIcon='Group'
            itemKey='resources'
          >
            <Resources />
          </PivotItem>
        )}
        {budgetTracking?.enabled && formControlProps.isEditMode && (
          <PivotItem
            headerText={t('projects.budget')}
            itemIcon='LineChart'
            itemKey='budget'
          >
            <BudgetTracking />
          </PivotItem>
        )}
      </Pivot>
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
