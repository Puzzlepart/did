import { SearchCustomer } from 'components'
import {
  CheckboxControl,
  FormControl,
  IconPickerControl,
  InputControl,
  InputControlOptions,
  LabelPickerControl,
  SliderControl
} from 'components/FormControl'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope } from 'security'
import { ProjectFormOptions } from './ProjectFormOptions'
import { TagPreview } from './TagPreview'
import { IProjectFormProps } from './types'
import { useProjectForm } from './useProjectForm'
import {
  useValidateKeyFunction,
  useValidateUniqueKeyFunction
} from './validation'
import { Pivot, PivotItem } from '@fluentui/react'
import { useSubscriptionSettings } from 'AppContext'

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
  const ValidateKeyFunction = useValidateKeyFunction()
  const ValidateUniqueKeyFunction = useValidateUniqueKeyFunction(
    model.value('customerKey'),
    !props.edit
  )
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
              onSelected={(customer) => model.set('customerKey', customer?.key)}
            />
          )}
          <InputControl
            {...register<InputControlOptions>('key', {
              casing: 'upper',
              replace: [new RegExp('[^a-zA-Z0-9]'), ''],
              validators: [ValidateKeyFunction, ValidateUniqueKeyFunction]
            })}
            disabled={!!props.edit}
            label={t('projects.keyFieldLabel')}
            description={t('projects.keyFieldDescription', { min: 2, max: 12 })}
            required={!props.edit}
          />
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
        </PivotItem>
        {budgetTracking?.enabled && (
          <PivotItem
            headerText={t('projects.budget')}
            itemIcon='LineChart'
            itemKey='budget'
          >
            <CheckboxControl
              {...register('budgetTracking.trackingEnabled')}
              label={t('projects.budgetTrackingEnabled')}
              description={t('projects.budgetTrackingEnabledDescription')}
              hidden={!props.edit}
            />
            <InputControl
              {...register<InputControlOptions>('budgetTracking.hours', {})}
              label={t('projects.budgetHours')}
              description={t('projects.budgetHoursDescription')}
              type='number'
              hidden={!model.value('budgetTracking.trackingEnabled' as any)}
            />
            <SliderControl
              {...register('budgetTracking.warningThreshold')}
              label={t('projects.budgetWarningThreshold')}
              description={t('projects.budgetWarningThresholdDescription')}
              formatValue={(value) => `${value * 100}%`}
              min={0}
              max={1}
              step={0.01}
              defaultValue={0.8}
              hidden={!model.value('budgetTracking.trackingEnabled' as any)}
            />
            <SliderControl
              {...register('budgetTracking.criticalThreshold')}
              label={t('projects.budgetCriticalThreshold')}
              description={t('projects.budgetCriticalThresholdDescription')}
              formatValue={(value) => `${value * 100}%`}
              min={0}
              max={1}
              step={0.01}
              defaultValue={0.9}
              hidden={!model.value('budgetTracking.trackingEnabled' as any)}
            />
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
