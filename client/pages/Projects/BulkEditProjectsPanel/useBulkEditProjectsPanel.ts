import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { IBulkEditProjectsPanelProps } from './types'
import $updateProjects from '../../../graphql-mutations/project/updateProjects.gql'
import { Project } from 'types'

export function useBulkEditProjectsPanel(
  props: IBulkEditProjectsPanelProps
) {
  const [updateProjects] = useMutation($updateProjects)
  const [inactive, setInactive] = useState<boolean | null>(null)
  const [labels, setLabels] = useState<string[]>([])
  const [partnerKey, setPartnerKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates: Partial<Project> = {}
      if (inactive !== null) updates.inactive = inactive
      if (labels.length > 0) updates.labels = labels
      if (partnerKey !== null) updates.partnerKey = partnerKey

      const projectsToUpdate = props.projects.map((project) => ({
        key: project.key,
        customerKey: project.customerKey,
        name: project.name,
        description: project.description || '',
        icon: project.icon,
        webLink: project.webLink,
        externalSystemURL: project.externalSystemURL,
        extensions: project.extensions || '{}',
        parentKey: project.parentKey,
        ...updates
      }))

      await updateProjects({
        variables: {
          projects: projectsToUpdate
        }
      })

      await props.onSave(updates)
      props.onDismiss()
    } catch {
      // Error is handled by Apollo Client
    } finally {
      setLoading(false)
    }
  }

  return {
    inactive,
    setInactive,
    labels,
    setLabels,
    partnerKey,
    setPartnerKey,
    loading,
    handleSave
  }
}
