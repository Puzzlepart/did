import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AllocationView } from './AllocationView'
import { Overview } from './Overview'
import { SummaryView } from './SummaryView'

/**
 * Renders a component passed as a prop.
 *
 * @param component - The component to be rendered.
 */
export const View: FC<{ component: FC }> = ({ component }) => {
  const Component = component
  return <Component />
}

/**
 * A custom hook that returns an array of React components for the Timesheet views.
 *
 * @returns An array of React components for the Timesheet views.
 */
export const useViews = () => {
  const { t } = useTranslation()
  Overview.displayName = t('timesheet.overviewHeaderText')
  SummaryView.displayName = t('timesheet.summaryHeaderText')
  AllocationView.displayName = t('timesheet.allocationHeaderText')

  const views = [Overview, SummaryView, AllocationView]

  /**
   * Returns the view object with the specified ID.
   *
   * @param id - The ID of the view to retrieve.
   *
   * @returns The view object with the specified ID, or undefined if no such view exists.
   */
  const getViewById = (id: string) => views.find((view) => view.id === id)

  return { views, getViewById }
}

export * from './types'
