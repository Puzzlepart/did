import { Project } from 'types'

/**
 * Represents the props for the SuggestedProjectMessage component.
 */
export interface ISuggestedProjectMessageProps {
    /** 
     * The ID of the current event.
     */
    eventId: string

    /**
     * The suggested project.
     */
    project: Project
}