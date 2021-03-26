/* eslint-disable tsdoc/syntax */
import { TooltipDelay, TooltipHost } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { ProjectTooltipContent } from './ProjectTooltipContent'
import { IProjectTooltipProps } from './types'

/**
 * Shows more details about the project in a
 * `<TooltipHost />` from `@fluentui/react`
 *
 * @category Reusable Component
 */
export const ProjectTooltip: ReusableComponent<IProjectTooltipProps> = (
  props
) => {
  return (
    <TooltipHost
      tooltipProps={{
        onRenderContent: () => <ProjectTooltipContent {...props} />
      }}
      delay={TooltipDelay.long}
      closeDelay={TooltipDelay.long}
      calloutProps={{ gapSpace: 0 }}>
      {props.children}
    </TooltipHost>
  )
}
