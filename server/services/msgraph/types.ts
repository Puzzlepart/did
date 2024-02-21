export interface MSGraphOutlookCategory {
  id: string
  displayName: string
  color: string
}

export class MSGraphError extends Error {
  constructor(
    name: string,
    message: string,
    public code?: string,
    public statusCode?: string
  ) {
    super(message)
    this.name = name
  }
}
