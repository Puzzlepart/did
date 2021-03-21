/* eslint-disable tsdoc/syntax */
import { TooltipDelay, TooltipHost } from 'office-ui-fabric-react'
import React, { FC } from 'react'
import { ProjectTooltipContent } from './ProjectTooltipContent'
import { IProjectTooltipProps } from './types'

/**
 * @category Function Component
 */
export const ProjectTooltip: FC<IProjectTooltipProps> = (
  props: IProjectTooltipProps
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
