import {
  Caption1,
  Card,
  CardHeader,
  mergeClasses,
  Spinner,
  Subtitle1
} from '@fluentui/react-components'
import {
  DateControl,
  DynamicButton,
  FormControl,
  InputControl,
  TabComponent,
  UserPickerControl
} from 'components'
import React from 'react'
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
  const {
    t,
    formControl,
    onReset,
    onExecuteReport,
    loading,
    items,
    collapsed,
    isQueryCalled,
    isFilterCriterasValid,
    addManagerUsersAction,
    isDisabled
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
                {t('reports.customQueryHeaderText')}
              </Subtitle1>
              {getFluentIcon(collapsed.value ? 'ChevronDown' : 'ChevronUp', {
                size: 30
              })}
            </div>
          }
        />

        <FormControl className={styles.formSection} {...formControl}>
          <Caption1 className={styles.subHeader}>
            {t('reports.filterCriteria')}
          </Caption1>

          <div className={styles.formRow}>
            <DateControl
              {...formControl.register('startDateTime')}
              label={t('common.startDate')}
              {...isDisabled('startDateTime')}
            />
            <DateControl
              {...formControl.register('endDateTime')}
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
            <InputControl
              {...formControl.register('projectId')}
              label={t('common.projectIdLabel')}
              description={t('reports.projectIdDescription')}
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
          <div className={styles.actions}>
            {loading && <Spinner size='tiny' />}
            <DynamicButton
              secondary
              text={t('reports.resetFilters')}
              disabled={loading || !isFilterCriterasValid}
              onClick={onReset}
            />
            <DynamicButton
              primary
              text={t('reports.runReport')}
              disabled={loading || !isFilterCriterasValid}
              onClick={onExecuteReport}
            />
          </div>
        </FormControl>
      </Card>
      <ReportsList
        hidden={!isQueryCalled}
        loading={loading && t('reports.loadingCustomReport')}
        items={items}
      />
    </div>
  )
}

CustomQueryTab.displayName = 'CustomQueryTab'
