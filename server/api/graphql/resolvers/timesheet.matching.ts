import { first, find, filter, contains, isEmpty } from 'underscore'
import { findBestMatch } from 'string-similarity'
import get from 'get-value'
import { Customer, EventObject, LabelObject, Project } from './types'

class EventMatching {
  public projects: Project[]
  public customers: Customer[]
  public labels: LabelObject[]

  /**
   * Constructs a new EventMatching class
   *
   * @param {Project[]} projects Projects
   * @param {Customer[]} customers Customers
   * @param {LabelObject[]} labels Labels
   */
  constructor(projects: Project[], customers: Customer[], labels: LabelObject[]) {
    this.projects = projects
    this.customers = customers
    this.labels = labels
  }

  /**
   * Find project suggestions using findBestMatch from string-similarity
   *
   * @param {*} customer Customer
   * @param {*} projectKey Project key
   */
  private _findProjectSuggestion(customer: any, projectKey: any) {
    try {
      const customerProjects = this.projects.filter((p) => p.customerKey === customer.key)
      const projectKeys = customerProjects.map((p) => p.id.split(' ')[1])
      const sm = findBestMatch(projectKey, projectKeys)
      const target = sm.bestMatch && sm.bestMatch.rating > 0 ? sm.bestMatch.target : null
      if (!target) return null
      const suggestion = first(customerProjects.filter((p) => p.id.split(' ')[1] === target.toUpperCase()))
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
   * @param {boolean} soft Soft search - don't require [], () or {}
   */
  private _searchString(inputStr: string, soft = false) {
    let regex = /[\(\{\[]((?<customerKey>[\wæøåÆØÅ]{2,}?)\s(?<key>[\wæøåÆØÅ]{2,}?))[\)\]\}]/gim
    if (soft) regex = /((?<customerKey>[\wæøåÆØÅ]{2,}?)\s(?<key>[\wæøåÆØÅ]{2,}))/gim
    const matches = []
    let match: RegExpExecArray
    while ((match = regex.exec(inputStr)) !== null) {
      matches.push({
        ...match.groups,
        id: `${match.groups.customerKey} ${match.groups.key}`
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
    const matches = this._searchString(categoriesStr, true)
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
    let projectKey
    if (!isEmpty(matches)) {
      for (let i = 0; i < matches.length; i++) {
        const { id, key, customerKey } = matches[i]
        event.customer = find(this.customers, (c) => customerKey === c.key)
        if (!!event.customer) {
          event.project = find(this.projects, (p) => p.id === id)
          projectKey = key
        }
        if (!!event.project) break
      }
    } else if (ignore === 'body') {
      return { ...event, isSystemIgnored: true }
    } else {
      event.project = find(this.projects, (p) => !!find(this._searchString(srchStr, true), (m) => m.id === p.id))
      if (!!event.project) event.customer = find(this.customers, (c) => c.key === event.project.customerKey)
    }
    if (!!event.customer && !event.project) {
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
    const inactiveProject = get(event, 'project.inactive')
    const inactiveCustomer = get(event, 'customer.inactive')
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
   * @param {*} events
   */
  public matchEvents(events: EventObject[]): EventObject[] {
    return events.map(this._matchEvent.bind(this))
  }
}

export default EventMatching
