import {
  Caption1,
  Card,
  CardHeader,
  mergeClasses,
  Subtitle1
} from '@fluentui/react-components'
import {
  BaseControlOptions,
  DateAfterValidator,
  DateBeforeValidator,
  DateControl,
  FormControl,
  InputControl,
  ProjectPickerControl,
  TabComponent,
  TimespanValidator,
  UserPickerControl
} from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils'
import { ReportsList } from '../ReportsList'
import styles from './CustomQueryTab.module.scss'
import { useCustomQueryTab } from './useCustomQueryTab'

/**
 * Custom query tab component that allows users to create and
 * execute custom report queries using the ReportsQuery parameters.
 *
 * @category Reports
 */
export const CustomQueryTab: TabComponent = (props) => {
  const { t } = useTranslation()
  const {
    formControl,
    loading,
    items,
    collapsed,
    isQueryCalled,
    addManagerUsersAction,
    isDisabled,
    error
  } = useCustomQueryTab(props.id)

  return (
    <div className={styles.customQueryTab}>
      <Card
        className={mergeClasses(
          styles.filterCriterias,
          collapsed.value && styles.isCollapsed
        )}
      >
        <CardHeader
          className={styles.header}
          onClick={collapsed.toggle}
          header={
            <div className={styles.inner}>
              <Subtitle1 className={styles.text}>
                {t('reports.filterCriteriasHeader')}
              </Subtitle1>
              {getFluentIcon(collapsed.value ? 'ChevronDown' : 'ChevronUp', {
                size: 30
              })}
            </div>
          }
        />

        <FormControl className={styles.formSection} {...formControl}>
          <Caption1 className={styles.subHeader}>
            {t('reports.filterCriteriasSubHeader')}
          </Caption1>

          <div className={styles.formRow}>
            <DateControl
              {...formControl.register('startDateTime', {
                connectedFields: ['endDateTime'],
                validators: [
                  DateBeforeValidator(
                    t,
                    formControl.model.value('endDateTime')
                  ),
                  TimespanValidator(
                    t,
                    {
                      name: t('common.endDate'),
                      value: formControl.model.value('endDateTime')
                    },
                    { maxDays: 500 }
                  )
                ]
              } as BaseControlOptions)}
              label={t('common.startDate')}
              {...isDisabled('startDateTime')}
            />
            <DateControl
              {...formControl.register('endDateTime', {
                connectedFields: ['startDateTime'],
                validators: [
                  DateAfterValidator(
                    t,
                    formControl.model.value('startDateTime')
                  ),
                  TimespanValidator(
                    t,
                    {
                      name: t('common.startDate'),
                      value: formControl.model.value('startDateTime')
                    },
                    { maxDays: 500 }
                  )
                ]
              } as BaseControlOptions)}
              label={t('common.endDate')}
              {...isDisabled('endDateTime')}
            />
          </div>

          <div className={styles.formRow}>
            <InputControl
              {...formControl.register('week')}
              type='number'
              label={t('common.weekNumberLabel')}
              className={styles.numberInput}
              min={1}
              max={53}
              {...isDisabled('week')}
            />

            <InputControl
              {...formControl.register('month')}
              type='number'
              label={t('common.month')}
              className={styles.numberInput}
              min={1}
              max={12}
              {...isDisabled('month')}
            />

            <InputControl
              {...formControl.register('year')}
              type='number'
              label={t('common.yearLabel')}
              className={styles.numberInput}
              min={2000}
              max={2100}
              {...isDisabled('year')}
            />
          </div>

          <div className={styles.formRow}>
            <ProjectPickerControl
              {...formControl.register('projectId')}
              label={t('common.projectIdLabel')}
              all
              maxSuggestions={8}
            />
          </div>

          <div className={styles.formRow}>
            <UserPickerControl
              {...formControl.register('userIds')}
              autoSelect
              fullWidth
              hideEmptyMessage
              label={t('reports.userIdsLabel')}
              multiple
              transformValue={(user) => user.id}
              customAction={addManagerUsersAction}
              list={{ simple: true }}
            />
          </div>
        </FormControl>
      </Card>
      <ReportsList
        hidden={!isQueryCalled}
        loading={loading && t('reports.loadingCustomReport')}
        items={items}
        error={error}
      />
    </div>
  )
}

CustomQueryTab.displayName = 'CustomQueryTab'
