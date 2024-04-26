import { Pivot, PivotItem } from '@fluentui/react'
import { useSubscriptionSettings } from 'AppContext'
import { SearchCustomer } from 'components'
import {
  CheckboxControl,
  FormControl,
  FormGroup,
  IconPickerControl,
  InputControl,
  InputControlOptions,
  LabelPickerControl
} from 'components/FormControl'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { BudgetTracking } from './BudgetTracking'
import { ProjectFormOptions } from './ProjectFormOptions'
import { ProjectKey } from './ProjectKey'
import { Resources } from './Resources'
import { TagPreview } from './TagPreview'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'

/**
 * ProjectForm component is used to create and edit projects.
 *
 * @category Projects
 */
export const ProjectForm: TabComponent<IProjectFormProps> = (props) => {
  const { budgetTracking } = useSubscriptionSettings()
  const { t } = useTranslation()
  const { model, register, options, formControlProps, isCustomerContext } =
    useProjectForm(props)
  return (
    <FormControl {...formControlProps}>
      <Pivot
        styles={{
          link: {
            display: budgetTracking?.enabled ? 'initial' : 'none'
          },
          itemContainer: {
            paddingTop: budgetTracking?.enabled ? 15 : 0
          }
        }}
      >
        <PivotItem
          headerText={t('common.general')}
          itemIcon='Info'
          itemKey='general'
        >
          <FormGroup gap={15}>
            {(!isCustomerContext || !!props.edit) && (
              <SearchCustomer
                {...register('customerKey', {
                  validators: t('projects.customerRequired')
                })}
                hidden={!!props.edit || isCustomerContext}
                label={t('common.customer')}
                description={t('projects.customerFieldDescription')}
                required={true}
                placeholder={t('common.searchPlaceholder')}
                selectedKey={model.value('customerKey')}
                onSelected={(customer) =>
                  model.set('customerKey', customer?.key)
                }
              />
            )}
            <ProjectKey register={register} isEdit={!!props.edit} />
            <TagPreview hidden={!!props.edit} />
            <InputControl
              {...register<InputControlOptions>('name', {
                casing: 'capitalized',
                validators: [{ minLength: 2 }]
              })}
              label={t('common.nameFieldLabel')}
              description={t('projects.nameFieldDescription')}
              required={true}
            />
            <InputControl
              {...register<InputControlOptions>('description', {
                casing: 'capitalized',
                validators: [
                  {
                    minLength: 10,
                    state: 'warning',
                    messages: { minLength: t('projects.descriptionWarning') }
                  }
                ]
              })}
              label={t('common.descriptionFieldLabel')}
              description={t('projects.descriptionFieldDescription')}
              rows={8}
            />
            <IconPickerControl
              {...register('icon')}
              required
              label={t('common.iconFieldLabel')}
              description={t('projects.iconFieldDescription')}
              placeholder={t('common.iconSearchPlaceholder')}
            />
            <CheckboxControl
              {...register('inactive')}
              label={t('common.inactiveFieldLabel')}
              description={t('projects.inactiveFieldDescription')}
              hidden={!props.edit}
            />
            <LabelPickerControl
              label={t('common.labelsText')}
              placeholder={t('common.filterLabels')}
              noSelectionText={t('projects.noLabelsSelectedText')}
              defaultSelectedKeys={model.value('labels')}
              onChange={(labels) =>
                model.set(
                  'labels',
                  labels.map((lbl) => lbl.name)
                )
              }
            />
            <ProjectFormOptions
              model={model}
              options={options}
              hidden={!!props.edit}
            />
          </FormGroup>
        </PivotItem>
        <PivotItem headerText='Ressurser' itemIcon='Group' itemKey='resources'>
          <Resources register={register} />
        </PivotItem>
        {budgetTracking?.enabled && !!props.edit && (
          <PivotItem
            headerText={t('projects.budget')}
            itemIcon='LineChart'
            itemKey='budget'
          >
            <BudgetTracking register={register} model={model} />
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
