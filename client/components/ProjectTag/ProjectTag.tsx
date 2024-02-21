import { Tooltip } from '@fluentui/react-components'
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary
} from '@fluentui/react-tags-preview'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getFluentIcon, getFluentIconWithFallback } from 'utils'
import { IProjectTagProps } from './types'
import { useProjectTag } from './useProjectTag'

/**
 * @category Reusable Component
 */
export const ProjectTag: ReusableComponent<IProjectTagProps> = (props) => {
  const {
    hasOutlookCategory,
    addOutlookCategory,
    addOutlookCategoryTooltip,
    onTagCopied
  } = useProjectTag(props)
  return (
    <InteractionTag>
      <CopyToClipboard text={props.project?.tag} onCopy={onTagCopied}>
        <InteractionTagPrimary
          hasSecondaryAction={props.enableFavoriting}
          icon={
            props.displayIcon && getFluentIconWithFallback(props.project.icon)
          }
        >
          <span>{props.project?.tag}</span>
        </InteractionTagPrimary>
      </CopyToClipboard>
      {props.enableFavoriting && (
        <Tooltip content={addOutlookCategoryTooltip} relationship='label'>
          <InteractionTagSecondary
            onClick={addOutlookCategory}
            style={{ cursor: hasOutlookCategory ? 'auto' : 'pointer' }}
          >
            {getFluentIcon('Heart', {
              bundle: true,
              filled: hasOutlookCategory,
              color: '#FF4033'
            })}
          </InteractionTagSecondary>
        </Tooltip>
      )}
    </InteractionTag>
  )
}

ProjectTag.displayName = 'ProjectLink'
