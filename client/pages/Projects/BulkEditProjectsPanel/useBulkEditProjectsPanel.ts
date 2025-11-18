import { useMutation } from '@apollo/client'
import { useState, useRef, useEffect } from 'react'
import { useMap } from 'hooks/common/useMap'
import { IBulkEditProjectsPanelProps } from './types'
import $updateProjects from '../../../graphql-mutations/project/updateProjects.gql'
import { Project } from 'types'

export function useBulkEditProjectsPanel(props: IBulkEditProjectsPanelProps) {
  const [updateProjects] = useMutation($updateProjects)
  const [loading, setLoading] = useState(false)
  const propsRef = useRef(props)

  // Track which fields have been modified by the user
  const [dirtyFields, setDirtyFields] = useState<Set<string>>(new Set())

  useEffect(() => {
    propsRef.current = props
  }, [props])

  // Create a model using useMap for form control compatibility
  const model = useMap<string, Partial<Project>>(new Map())

  // Track field changes
  const originalSet = model.set
  model.set = (key: string, value: any) => {
    setDirtyFields((prev) => new Set(prev).add(key))
    return originalSet(key, value)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates: Partial<Project> = {}

      // Only include fields that were actually changed
      if (dirtyFields.has('inactive')) {
        updates.inactive = model.value('inactive')
      }
      if (dirtyFields.has('labels')) {
        updates.labels = model.value('labels', [])
      }
      if (dirtyFields.has('partnerKey')) {
        updates.partnerKey = model.value('partnerKey')
      }
      if (dirtyFields.has('parentKey')) {
        updates.parentKey = model.value('parentKey')
      }

      const projectsToUpdate = propsRef.current.projects.map((project) => ({
        key: project.key,
        customerKey: project.customerKey,
        name: project.name,
        description: project.description || '',
        icon: project.icon,
        webLink: project.webLink,
        externalSystemURL: project.externalSystemURL,
          extensions: typeof project.extensions === 'string' ? project.extensions : JSON.stringify(project.extensions || {}),
        parentKey: project.parentKey,
        ...updates
      }))

      await updateProjects({
        variables: {
          projects: projectsToUpdate
        }
      })

      await propsRef.current.onSave(updates)
      propsRef.current.onDismiss()
    } catch {
      // Error is handled by Apollo Client
    } finally {
      setLoading(false)
    }
  }

  return {
    model,
    loading,
    handleSave
  }
}
