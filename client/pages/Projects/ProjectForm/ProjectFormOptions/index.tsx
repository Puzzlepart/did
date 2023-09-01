import { Checkbox } from '@fluentui/react-components'
import { SubText } from 'components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProjectFormOptions.module.scss'
import { IProjectFormOptionsProps } from './types'

/**
 * @category Projects
 */
export const ProjectFormOptions: FC<IProjectFormOptionsProps> = (props) => {
  const { t } = useTranslation()
  return (
    <div className={styles.root} hidden={props.hidden}>
      <Checkbox
        label={t('projects.createOutlookCategoryFieldLabel')}
        checked={props.options.value('createOutlookCategory')}
        onChange={(_event, data) =>
          props.options.set('createOutlookCategory', data?.checked ?? false)
        }
      />
      <SubText
        text={t('projects.createOutlookCategoryFieldDescription', {
          id: props.model.projectId
        })}
      />
    </div>
  )
}
