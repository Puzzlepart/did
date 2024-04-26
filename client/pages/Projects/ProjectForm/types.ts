import { OperationVariables } from '@apollo/client'
import { IFormControlProps, useFormControls } from 'components/FormControl'
import { ITabProps } from 'components/Tabs'
import { FC } from 'react'
import { Project, ProjectInput, ProjectOptions } from 'types'
import { useProjectModel } from './useProjectModel'

export interface IProjectFormInputProps {
  register: ReturnType<typeof useFormControls>
  isEdit: boolean
}

/**
 * @category Projects
 */
export interface IProjectFormProps
  extends ITabProps,
    IFormControlProps<Project> {
  /**
   * Refetch callback to execute when the form has been submitted
   * successfully.
   */
  refetch?: () => void
}

interface IProjectFormTabProps {
  register: ReturnType<typeof useFormControls>
  model?: ReturnType<typeof useProjectModel>
}

export type ProjectFormTabComponent = FC<IProjectFormTabProps>

/**
 * Variables for creating or updating a customer.
 */
export interface CreateOrUpdateProjectVariables extends OperationVariables {
  /**
   * The project input object.
   */
  project: Partial<ProjectInput>

  /*
   * Flag that decides whether to update or create a project.
   */
  update?: boolean

  /**
   * Options for the project creation.
   */
  options?: ProjectOptions
}
