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

  // Store original set method before any overriding
  const originalSetRef = useRef<typeof model.set>(null)
  if (!originalSetRef.current) {
    originalSetRef.current = model.set.bind(model)
    // Override set method immediately to track changes
    model.set = (key: string, value: any) => {
      setDirtyFields((prev) => new Set(prev).add(key))
      return originalSetRef.current(key, value)
    }
  }

  const normalizeLabels = (labels: Project['labels']) =>
    (labels ?? []).map((label) =>
      typeof label === 'string' ? label : label?.name
    )

  const getSortedLabels = (labels: Project['labels']) =>
    [...normalizeLabels(labels)].sort()

  // Initialize model with common values from all selected projects
  useEffect(() => {
    // Clear model and dirty fields when projects change
    model.$set(new Map())
    setDirtyFields(new Set())

    if (props.projects.length === 0) return

    const firstProject = props.projects[0]

    // Check if all projects have the same labels
    const firstLabels = getSortedLabels(firstProject.labels)
    const allLabelsMatch = props.projects.every((p) => {
      const labels = getSortedLabels(p.labels)
      return JSON.stringify(labels) === JSON.stringify(firstLabels)
    })

    // Build initial map with common values
    const initialMap = new Map<string, any>()

    if (allLabelsMatch && firstLabels.length > 0) {
      initialMap.set('labels', firstLabels)
    }

    // Check if all projects have the same inactive status
    const allInactiveMatch = props.projects.every(
      (p) => p.inactive === firstProject.inactive
    )
    if (allInactiveMatch && firstProject.inactive !== undefined) {
      initialMap.set('inactive', firstProject.inactive)
    }

    // Check if all projects have the same partnerKey
    const allPartnerKeyMatch = props.projects.every(
      (p) => p.partnerKey === firstProject.partnerKey
    )
    if (allPartnerKeyMatch && firstProject.partnerKey) {
      initialMap.set('partnerKey', firstProject.partnerKey)
    }

    // Check if all projects have the same parentKey
    const allParentKeyMatch = props.projects.every(
      (p) => p.parentKey === firstProject.parentKey
    )
    if (allParentKeyMatch && firstProject.parentKey) {
      initialMap.set('parentKey', firstProject.parentKey)
    }
    // Set all values at once using $set
    model.$set(initialMap)
  }, [props.projects])

  const handleSave = async () => {
    setLoading(true)
    try {
      const updates: Partial<Project> = {}

      // Only include fields that were actually changed
      if (dirtyFields.has('inactive')) {
        updates.inactive = model.value('inactive')
      }
      const labelsValue = model.value('labels')
      if (labelsValue !== undefined) {
        updates.labels = labelsValue ?? []
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

      const result = await updateProjects({
        variables: {
          projects: projectsToUpdate
        }
      })

      const data = result.data?.updateProjects
      if (data?.success) {
        await propsRef.current.onSave(updates)
        propsRef.current.onDismiss()
      } else if (data?.errors && data.errors.length > 0) {
        // Show error message with details
        const errorMessage = `${data.successCount} of ${projectsToUpdate.length} projects updated successfully. ${data.failureCount} failed: ${data.errors.map((e) => `${e.projectKey}: ${e.message}`).join(', ')}`
        alert(errorMessage)
        // Still close the panel and refresh even with partial success
        await propsRef.current.onSave(updates)
        propsRef.current.onDismiss()
      }
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
