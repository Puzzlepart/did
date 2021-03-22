/* eslint-disable tsdoc/syntax */
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react'
import React from 'react'
import { ProjectTooltipContent } from './ProjectTooltipContent'
import { IProjectTooltipProps } from './types'

/**
 * Shows more details about the project in a
 * `<TooltipHost />` from `office-ui-fabric-react`
 *
 * @category Function Component
 */
export const ProjectTooltip: React.FC<IProjectTooltipProps> = (
  props
): JSX.Element => {
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
