import { TooltipDelay, TooltipHost } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'
import { ProjectTooltipContent } from './ProjectTooltipContent'
import { IProjectTooltipProps } from './types'


export const ProjectTooltip: FunctionComponent<IProjectTooltipProps> = (props: IProjectTooltipProps): JSX.Element => {
  return (
    <TooltipHost
      tooltipProps={{ onRenderContent: () => <ProjectTooltipContent  {...props} /> }}
      delay={TooltipDelay.long}
      closeDelay={TooltipDelay.long}
      calloutProps={{ gapSpace: 0 }}>
     {props.children}
    </TooltipHost>
  )
}