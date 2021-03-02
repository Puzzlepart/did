import { ChoiceGroup, DefaultButton, Icon, Panel } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useExcelExport } from '../../../hooks'
import styles from '../UserMenu.module.scss'
import { useUserExportHours } from './useUserExportHours'

export const UserExportHours: FunctionComponent = () => {
  const { t } = useTranslation()
  const {
    queryPreset,
    setQueryPreset,
    queryPresets,
    showPanel,
    togglePanel,
    timeentries,
    loading,
    columns
  } = useUserExportHours()

  const { onExport } = useExcelExport({
    items: timeentries,
    fileName: queryPreset?.exportFileName,
    columns
  })

  return (
    <>
      <a href='#' onClick={togglePanel} className={styles.menuItem}>
        <Icon iconName='CloudImportExport' className={styles.icon} />
        <span>{t('common.exportMyHours')}</span>
      </a>
      <Panel
        headerText={t('common.exportMyHours')}
        isOpen={showPanel}
        onDismiss={togglePanel}
        isLightDismiss={true}>
        <ChoiceGroup
          defaultSelectedKey={queryPreset?.key}
          onChange={setQueryPreset}
          options={queryPresets}
        />
        <DefaultButton
          text={t('common.export')}
          styles={{ root: { marginTop: 20, width: '100%' } }}
          onClick={onExport}
          disabled={!queryPreset || loading}
        />
      </Panel>
    </>
  )
}
