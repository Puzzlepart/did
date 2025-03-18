import {
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { ProjectPopoverContent } from './ProjectPopoverContent'
import { IProjectPopoverProps } from './types'

/**
 * Shows more details about the project in a
 * `<TooltipHost />` from `@fluentui/react`
 *
 * @category Reusable Component
 */

export const ProjectPopover: ReusableComponent<IProjectPopoverProps> = (
  props
) => {
  return (
    <Popover openOnHover={true} mouseLeaveDelay={250} openOnContext>
      <PopoverTrigger>
        <div>{props.children}</div>
      </PopoverTrigger>
      <PopoverSurface>
        <ProjectPopoverContent {...props}>
          {props.content}
        </ProjectPopoverContent>
      </PopoverSurface>
    </Popover>
  )
}

ProjectPopover.displayName = 'ProjectPopover'
ProjectPopover.defaultProps = {
  width: 400,
  content: null
}
