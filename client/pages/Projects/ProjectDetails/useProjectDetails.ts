import { TabItems } from 'components/Tabs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectsContext } from '../context'
import { ProjectInformation } from './ProjectInformation'
import { ProjectTimeEntries } from './ProjectTimeEntries'

/**
 * Component logic hook that returns an object with tabs for the project details page.
 *
 * @returns An object with tabs for the project details page.
 */
export function useProjectDetails() {
  const { t } = useTranslation()
  const context = useProjectsContext()
  const tabs: TabItems = useMemo(
    () => ({
      information: [
        ProjectInformation,
        {
          text: t('projects.informationHeaderText'),
          iconName: 'Info'
        }
      ],
      timeEntries: [
        ProjectTimeEntries,
        {
          text: t('projects.timeEntriesHeaderText'),
          iconName: 'Timeline'
        }
      ]
    }),
    [context.loading]
  )

  return { tabs }
}
