import {
  Caption1,
  Card,
  CardHeader,
  mergeClasses,
  Spinner,
  Subtitle1
} from '@fluentui/react-components'
import { DateControl, DynamicButton, FormControl, InputControl, TabComponent, UserPickerControl } from 'components'
import React from 'react'
import { ReportsList } from '../ReportsList'
import styles from './CustomQueryTab.module.scss'
import { useCustomQueryTab } from './useCustomQueryTab'
import { getFluentIcon } from 'utils'
import { useAppContext } from 'AppContext'

/**
 * Custom query tab component that allows users to create and
 * execute custom report queries using the ReportsQuery parameters.
 *
 * @category Reports
 */
export const CustomQueryTab: TabComponent = () => {
  const context = useAppContext()
  const {
    t,
    formControl,
    executeReport,
    loading,
    collapsed,
    isQueryCalled,
    isFilterCriterasValid
  } = useCustomQueryTab()

  return (
    <div className={styles.customQueryTab}>
      <Card className={mergeClasses(styles.filterCriterias, collapsed.value && styles.isCollapsed)}>
        <CardHeader
          className={styles.header}
          onClick={collapsed.toggle}
          header={
            <div className={styles.inner}>
              <Subtitle1 className={styles.text}>{t('reports.customQueryHeaderText')}</Subtitle1>
              {getFluentIcon(collapsed.value ? 'ChevronDown' : 'ChevronUp', { size: 30 })}
            </div>
          } />

        <FormControl className={styles.formSection} {...formControl}>
          <Caption1 className={styles.subHeader}>{t('reports.filterCriteria')}</Caption1>

          <div className={styles.formRow}>
            <DateControl
              {...formControl.register('startDateTime')}
              label={t('common.startDate')} />
            <DateControl
              {...formControl.register('endDateTime')}
              label={t('common.endDate')} />
          </div>

          <div className={styles.formRow}>
            <InputControl
              {...formControl.register('week')}
              type='number'
              label={t('common.weekNumberLabel')}
              className={styles.numberInput}
              minLength={1}
              maxLength={53}
            />

            <InputControl
              {...formControl.register('month')}
              type='number'
              label={t('common.month')}
              className={styles.numberInput}
              minLength={1}
              maxLength={12}
            />

            <InputControl
              {...formControl.register('year')}
              type='number'
              label={t('common.yearLabel')}
              className={styles.numberInput}
              minLength={2000}
              maxLength={2100}
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
              fullWidth
              label={t('reports.userIdsLabel')}
              multiple
              transformValue={(user) => user.id}
              customAction={state => ({
                text: t('reports.addUsersManager'),
                onClick: () => {
                  const users = state.users.filter(user => user.manager?.id.startsWith(context.user.id))
                  formControl.model.set('userIds', users.map(user => user.id))
                }
              })}
            />
          </div>

          <div className={styles.actions}>
            {loading && <Spinner size='tiny' />}
            <DynamicButton
              secondary
              text={t('reports.resetFilters')}
              disabled={loading}
              onClick={formControl.model.reset} />
            <DynamicButton
              primary
              text={t('reports.runReport')}
              disabled={loading || !isFilterCriterasValid}
              onClick={executeReport} />
          </div>
        </FormControl>
      </Card>
      <ReportsList
        hidden={!isQueryCalled}
        filters={false}
        search={false} />
    </div>
  )
}

CustomQueryTab.displayName = 'CustomQueryTab'