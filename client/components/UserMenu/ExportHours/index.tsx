import { useId } from '@uifabric/react-hooks'
import { UserMessage } from 'components/UserMessage'
import { ChoiceGroup, Icon, Link, Panel } from 'office-ui-fabric-react'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../UserMenu.module.scss'
import { IExportType } from './types'

export const ExportHours: FunctionComponent = () => {
  const { t } = useTranslation()
  const [exportType, setExportType] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const toggleId = useId('toggle-panel')

  /**
   * Toggle panel
   *
   * @param event - Mouse event
   */
  const togglePanel = (event: React.MouseEvent<any>) => {
    switch (event.currentTarget.id) {
      case toggleId:
        setPanelOpen(true)
        break
      default:
        setPanelOpen(false)
    }
  }

  return (
    <>
      <a
        href='#'
        id={toggleId}
        onClick={togglePanel}
        className={styles.menuItem}>
        <Icon iconName='CloudImportExport' className={styles.icon} />
        <span>{t('common.exportMyHours')}</span>
      </a>
      <Panel
        headerText={t('common.exportMyHours')}
        isOpen={panelOpen}
        onDismiss={togglePanel}
        isLightDismiss={true}>
        <ChoiceGroup
          defaultSelectedKey={exportType?.key}
          onChange={(_eve, option: IExportType) => setExportType(option)}
          options={[]}
        />
        <UserMessage>
          Export my hours is currently disabled. See
          <Link href='https://github.com/Puzzlepart/did/issues/846'>
            Issue #846 on GitHub
          </Link>{' '}
          for more details.
        </UserMessage>
      </Panel>
    </>
  )
}
