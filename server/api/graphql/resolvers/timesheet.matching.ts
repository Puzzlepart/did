import MSGraphEvent from 'server/api/services/msgraph.event'
import { findBestMatch } from 'string-similarity'
import { contains, filter, find, first, isEmpty } from 'underscore'
import { Customer, EventObject, LabelObject, Project } from './types'

export default class {
  constructor(
    public projects: Project[],
    public customers: Customer[],
    public labels: LabelObject[]
  ) { }

  /**
   * Find project suggestions using findBestMatch from string-similarity
   *
   * @param {Customer} customer Customer
   * @param {string} projectKey Project key
   */
  private _findProjectSuggestion(customer: Customer, projectKey: string) {
    try {
      const customerProjects = this.projects.filter((p) => p.customerKey === customer.key)
      const projectKeys = customerProjects.map((p) => p.projectKey)
      const { bestMatch } = findBestMatch(projectKey, projectKeys)
      if (!bestMatch || bestMatch.rating <= 0) return null
      const { target } = bestMatch
      const suggestion = first(
        customerProjects.filter((p) => p.projectKey === target.toUpperCase())
      )
      return suggestion
    } catch (error) {
      return null
    }
  }

  /**
   * Looks for ignore "tag" in event.
   *
   * @returns
   * * Returns 'category' if ignore category is found
   * * Returns 'body' if ignore tag is found in body
   * * Otherwise returns nulll
   *
   * @param {EventObject} event
   */
  private _findIgnore(event: EventObject) {
    const ignoreCategory = find(event.categories, (c) => c.toLowerCase() === 'ignore')
    if (!!ignoreCategory) return 'category'
    if ((event.body || '').match(/[(\[\{]IGNORE[)\]\}]/gi) !== null) return 'body'
    return null
  }

  /**
   * Find project match in title/subject/categories
   *
   * @param {string} inputStr The String object or string literal on which to perform the search.
   * @param {boolean} strictMode Strict mode - require token
   *
   * @returns an array of matches found in the inputStr
   */
  private _searchString(
    inputStr: string,
    strictMode: boolean = true
  ): Array<{ id: string; projectKey: string; customerKey: string }> {
    let regex = /((?<customerKey>[\wæøåÆØÅ]{2,}?)\s(?<projectKey>[\wæøåÆØÅ]{2,}))/gim
    if (strictMode)
      regex = /[\(\{\[]((?<customerKey>[\wæøåÆØÅ]{2,}?)\s(?<projectKey>[\wæøåÆØÅ]{2,}?))[\)\]\}]/gim
    const matches = []
    let match: RegExpExecArray
    while ((match = regex.exec(inputStr)) !== null) {
      const { projectKey, customerKey } = match.groups
      matches.push({
        ...match.groups,
        id: [customerKey, projectKey].join(' ')
      })
    }
    return matches
  }

  /**
   * Find project match in title/body/categories
   *
   * @param {string} inputStr The String object or string literal on which to perform the search.
   * @param {string} categoriesStr Categories string
   */
  private _findProjectMatches(inputStr: string, categoriesStr: string) {
    const matches = this._searchString(categoriesStr, false)
    return matches || this._searchString(inputStr)
  }

  /**
   * Find label matches in categories
   *
   * @param {string[]} categories
   */
  private _findLabels(categories: string[]) {
    return filter(this.labels, (lbl) => contains(categories, lbl.name))
  }

  /**
   * Checks for project match in event
   *
   * 1. Checks category/title/description for tokens
   * 2. Checks title/description for key without any brackets/parantheses
   *
   * @param {EventObject} event Event
   */
  private _matchEvent(event: EventObject) {
    const ignore = this._findIgnore(event)
    if (ignore === 'category') {
      return { ...event, isSystemIgnored: true }
    }
    const categoriesStr = event.categories.join('|').toUpperCase()
    const srchStr = [event.title, event.body, categoriesStr].join('|').toUpperCase()
    const matches = this._findProjectMatches(srchStr, categoriesStr)
    let projectKey: string

    // We found token matches in srchStr or categoriesStr
    // We look through the matches and check if they match against
    // a project
    if (!isEmpty(matches)) {
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        event.customer = find(this.customers, (c) => match.customerKey === c.key)
        if (event.customer) {
          event.project = find(this.projects, (p) => p.id === match.id)
          projectKey = match.projectKey
        }
        if (event.project) break
      }
    }

    // We check if we found ignore tag in body
    else if (ignore === 'body') {
      return { ...event, isSystemIgnored: true }
    }

    // We search the whole srchStr for match in non-strict/soft mode
    else {
      const softMatches = this._searchString(srchStr, false)
      event.project = find(
        this.projects,
        (p) => !!find(softMatches, (m) => m.id === p.id)
      )
      event.customer = find(this.customers, (c) => {
        const match = find(softMatches, (m) => m.customerKey === c.key)
        if (!match) return false
        projectKey = match.projectKey
        return true
      })
    }

    // We look for project suggestions in case of e.g. typo
    if (event.customer && !event.project) {
      event.suggestedProject = this._findProjectSuggestion(event.customer, projectKey)
    }

    event.labels = this._findLabels(event.categories)
    event = this._checkInactive(event)
    return event
  }

  /**
   * Check if project or customer is marked as inactive
   *
   * @param {EventObject} event
   */
  private _checkInactive(event: EventObject) {
    const inactiveProject = event?.project?.inactive
    const inactiveCustomer = event?.customer?.inactive
    if (event.project && (inactiveProject || inactiveCustomer)) {
      if (inactiveProject) event.error = { code: 'PROJECT_INACTIVE' }
      if (inactiveCustomer) event.error = { code: 'CUSTOMER_INACTIVE' }
      event.project = null
      event.customer = null
    }
    return event
  }

  /**
   * Match events
   *
   * @param {MSGraphEvent[]} events
   */
  public matchEvents(events: MSGraphEvent[]): EventObject[] {
    return events.map(this._matchEvent.bind(this))
  }
}
