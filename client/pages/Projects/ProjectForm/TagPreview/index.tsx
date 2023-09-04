/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserMessage } from 'components'
import { useFormControlContext } from 'components/FormControl'
import React, { FC, HTMLProps } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * @category Projects
 */
export const TagPreview: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const { t } = useTranslation()
  const { model } = useFormControlContext()
  const hasValidProjectId = model.value('key') && model.value('customerKey')
  return (
    <div hidden={props.hidden}>
      <UserMessage
        // containerStyle={{ marginTop: 10 }}
        // iconName='OutlookLogo'
        text={
          hasValidProjectId
            ? t('projects.idPreviewText', props)
            : t('projects.idPreviewBlankText')
        }
      />
    </div>
  )
}
