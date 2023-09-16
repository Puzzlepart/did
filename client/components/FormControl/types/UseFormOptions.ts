export type UseFormOptions = {
  /**
   * The mutation to use when submitting
   * the form.
   */
  mutation: any

  /**
   * Function to generate the variables
   * based on the model.
   */
  variables: ($: Record<string, any>) => Record<string, any>

  /**
   * Message to show on success.
   */
  successMessage?: string

  /**
   * Message to show on error.
   */
  errorMessage?: string
}
