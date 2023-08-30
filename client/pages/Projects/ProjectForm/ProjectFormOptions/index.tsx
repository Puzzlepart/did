import { Checkbox } from '@fluentui/react-components'
import { SubText } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProjectFormOptions.module.scss'
import { IProjectFormOptionsProps } from './types'

/**
 * @category Projects
 */
export const ProjectFormOptions: FC<IProjectFormOptionsProps> = ({
  model,
  options,
  hidden
}) => {
  const { t } = useTranslation()
  return (
    <div className={styles.root} hidden={hidden}>
      <Checkbox
        label={t('projects.createOutlookCategoryFieldLabel')}
        checked={options.value('createOutlookCategory')}
        onChange={(_event, data) =>
          options.set('createOutlookCategory', data?.checked ?? false)
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
