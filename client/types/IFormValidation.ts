export interface IFormValidation {
  errors: {
    [key: string]: string
  }
  invalid: boolean
}
