import { Checkbox } from '@fluentui/react-components'
import { SubText } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './ProjectFormOptions.module.scss'
import { IProjectFormOptionsProps } from './types'

/**
 * @category Projects
 */
export const ProjectFormOptions: StyledComponent<IProjectFormOptionsProps> = (
  props
) => {
  const { t } = useTranslation()
  return (
    <div className={ProjectFormOptions.className} hidden={props.hidden}>
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

ProjectFormOptions.displayName = 'ProjectFormOptions'
ProjectFormOptions.className = styles.projectFormOptions
