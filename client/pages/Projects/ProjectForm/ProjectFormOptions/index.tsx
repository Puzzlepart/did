/* eslint-disable tsdoc/syntax */
import { Toggle } from '@fluentui/react'
import { SubText } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProjectFormOptions.module.scss'
import { IProjectFormOptionsProps } from './types'

/**
 * @category Projects
 */
export const ProjectFormOptions: React.FC<IProjectFormOptionsProps> = ({
  model,
  options,
  hidden
}) => {
  const { t } = useTranslation()
  return (
    <div className={styles.root} hidden={hidden}>
      <Toggle
        label={t('projects.createOutlookCategoryFieldLabel')}
        checked={options.value('createOutlookCategory')}
        onChange={(_event, value) =>
          options.set('createOutlookCategory', value)
        }
      />
      <SubText
        text={t('projects.createOutlookCategoryFieldDescription', {
          id: model.projectId
        })}
      />
    </div>
  )
}
