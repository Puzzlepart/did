import get from 'get-value'
import { findBestMatch } from 'string-similarity'
import _ from 'underscore'
import s from 'underscore.string'
import { Customer, EventObject, Project } from '../../graphql/resolvers/types'
import { tryParseJson } from '../../utils'
import { ProjectResourcesExtensionId, ProjectsData } from '../mongo/project'
import { ProjectMatch } from './types'

/**
 * Timesheet matching engine
 *
 * @category TimesheetService
 */
export default class TimesheetMatchingEngine {
  protected _configuration?: Record<string, any>

  /**
   * Constructor for `TimesheetMatchingEngine`
   *
   * @param _data - Projects data
   */
  // eslint-disable-next-line unicorn/empty-brace-spaces
  constructor(private _data: ProjectsData) {}

  /**
   * Find project suggestions using findBestMatch from string-similarity
   *
   * @param customer - Customer
   * @param projectKey - Project key
   */
  private _findProjectSuggestion(customer: Customer, projectKey: string) {
    try {
      const customerProjects = this._data.projects.filter(
        (p) => p.customerKey === customer.key
      )
      const projectKeys = customerProjects.map((p) => p.key)
      const { bestMatch } = findBestMatch(projectKey, projectKeys)
      if (!bestMatch || bestMatch.rating <= 0) return null
      const { target } = bestMatch
      const suggestion = _.first(
        customerProjects.filter((p) => p.key === target.toUpperCase())
      )
      return suggestion
    } catch {
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
   * @param event - Event to check for ignore
   */
  private _findIgnore(event: EventObject) {
    const ignoreCategory = _.find(
      event.categories,
      (c) => c.toLowerCase() === 'ignore'
    )
    if (!!ignoreCategory) return 'category'
    if ((event.body || '').match(/[([{]ignore[)\]}]/gi) !== null) return 'body'
    return null
  }

  /**
   * Find project match in title/subject/categories
   *
   * @param inputStr - The String object or string literal on which to perform the search.
   * @param strictMode - Strict mode - require token
   *
   * @returns an array of matches found in the inputStr
   */
  private _searchString(
    inputString: string,
    strictMode: boolean = true
  ): ProjectMatch[] {
    let regex = /((?<customerKey>[\wåæø]{2,}?)\s(?<key>[\wåæø]{2,}))/gim
    if (strictMode)
      regex =
        /[([{]((?<customerKey>[\wåæø]{2,}?)\s(?<key>[\wåæø]{2,}?))[)\]}]/gim
    const matches = []
    let match: RegExpExecArray
    while ((match = regex.exec(inputString)) !== null) {
      const { key, customerKey } = match.groups
      matches.push({
        ...match.groups,
        id: [customerKey, key].join(' ')
      } as ProjectMatch)
    }
    return matches
  }

  /**
   * Find project match in title/body/categories
   *
   * @param inputString The String object or string literal on which to perform the search.
   * @param categoriesString Categories string
   */
  private _findProjectMatches(
    inputString: string,
    categoriesString: string
  ): ProjectMatch[] {
    const matches = this._searchString(categoriesString, false)
    return matches || this._searchString(inputString)
  }

  /**
   * Find label matches in categories
   *
   * @param categories - Categories
   */
  private _findLabels(categories: string[]) {
    return _.filter(this._data.labels, (lbl) =>
      _.contains(categories, lbl.name)
    )
  }

  /**
   * The method takes an event object as its parameter. It first checks if
   * the event should be ignored based on certain criteria, and if so,
   * it returns the event object with a property indicating that it is system-ignored.
   * Otherwise, it creates a search string by concatenating the event's title, body,
   * and categories in upper case, and uses this search string to find project matches.
   * If there are matches, it sets the customer and project properties of the event
   * object to the corresponding customer and project objects. If no matches are found,
   * but the event should be ignored based on the body of the event, it returns the event
   * object with a property indicating that it is system-ignored. If no matches are found
   * and the event should not be ignored, it searches the entire search string for matches
   * in non-strict/soft mode and sets the project property of the event object to the
   * matching project object. If a customer is found but no project is found,
   * it looks for project suggestions based on the customer and a project key.
   * Finally, it sets the labels property of the event object to the labels
   * that are found based on the categories of the event and checks if the event is inactive.
   * It also fixes the duration of the event if necessary and returns the modified event object.
   *
   * @param event - The event object to be matched.
   *
   * @returns The modified event object with customer, project, labels, and possibly other properties set.
   */
  private _matchEvent(event: EventObject) {
    const ignore = this._findIgnore(event)
    if (ignore === 'category') {
      return { ...event, isSystemIgnored: true }
    }
    const categoriesString = event.categories.join('|').toUpperCase()
    const searchString = [event.title, event.body, categoriesString]
      .join('|')
      .toUpperCase()

    // Find project matches based on the search string
    const projectMatches = this._findProjectMatches(
      searchString,
      categoriesString
    )

    let projectKey: string

    // We check if title is blank, and return an error
    if (s.isBlank(event.title) && !ignore)
      return { ...event, error: { code: 'EVENT_NO_TITLE' } }
    else if (!_.isEmpty(projectMatches)) {
      for (const match of projectMatches) {
        event.customer = _.find(
          this._data.customers,
          (c) => match.customerKey === c.key
        )
        if (event.customer) {
          event.project = _.find(
            this._data.projects,
            ({ _id }) => _id === match.id
          )
          projectKey = match.key
        }
        if (event.project) break
      }
    }

    // We check if we found ignore tag in body
    else if (ignore === 'body') {
      return { ...event, isSystemIgnored: true }
    }

    // We search the whole searchString for match in non-strict/soft mode
    else {
      const softMatches = this._searchString(searchString, false)
      event.project = _.find(
        this._data.projects,
        // eslint-disable-next-line unicorn/prefer-array-some
        ({ _id }) => !!_.find(softMatches, (m) => m.id === _id)
      )
      event.customer = _.find(
        this._data.customers,
        ({ key }) => key === event.project?.customerKey
      )
    }

    if (event.project) {
      event.role = this._findProjectRole(event.project)
    }

    // If a customer is found but no project is found, look for project
    // suggestions based on the customer and a project key
    if (event.customer && !event.project) {
      event.suggestedProject = this._findProjectSuggestion(
        event.customer,
        projectKey
      )
    }

    // Set the labels property of the event object based on the categories of the event
    event.labels = this._findLabels(event.categories)

    // Check if the event is inactive
    event = this._checkInactive(event)

    // Fix the duration of the event if necessary
    event = this._fixDuration(event)
    return event
  }

  private _findProjectRole(project: Project) {
    const extensions = tryParseJson(
      get(project, 'extensions', { default: 'null' })
    )
    if (!extensions) return null
    const resources = get(
      extensions,
      `${ProjectResourcesExtensionId}.properties.resources`,
      { default: [] }
    )
    const resource = _.find(
      resources,
      ({ id }) => id === this._configuration.userId
    )
    if (!resource) return null
    return {
      name: resource.projectRole,
      hourlyRate: resource.hourlyRate
    }
  }

  /**
   * Check if project or customer is marked as inactive
   *
   * @param event - Event to check
   */
  private _checkInactive(event: EventObject) {
    const inactiveProject = event?.project?.inactive
    const inactiveCustomer = event?.customer?.inactive
    if (event.project && (inactiveProject || inactiveCustomer)) {
      if (inactiveProject) event.error = { code: 'PROJECT_INACTIVE' }
      if (inactiveCustomer) event.error = { code: 'CUSTOMER_INACTIVE' }
      event.project = null
    }
    return event
  }

  /**
   * Fixes duration (rounds up to nearest 30 minutes) for events starting at xx:05 or
   * ending at either XX:20, XX:25, XX:50 or XX:55 if user configuration `timesheet.roundUpEvents`
   * is set to `true`.
   *
   * @param event - Event
   */
  private _fixDuration(event: EventObject) {
    if (!this._configuration?.roundUpEvents) return event
    const startMinutes = new Date(event.startDateTime).getMinutes()
    const endMinutes = new Date(event.endDateTime).getMinutes()
    if ([5].includes(startMinutes) || [20, 25, 50, 55].includes(endMinutes)) {
      event.originalDuration = event.duration
      event.duration = Math.round(event.duration * 2) / 2
      event.adjustedMinutes = event.duration * 60 - event.originalDuration * 60
      if (startMinutes === 5) {
        const newStartDateTime = new Date(event.startDateTime)
        newStartDateTime.setMinutes(0)
        event.startDateTime = newStartDateTime
      }
      if ([20, 25].includes(endMinutes)) {
        const newEndDateTime = new Date(event.endDateTime)
        newEndDateTime.setMinutes(30)
        event.endDateTime = newEndDateTime
      }
      if ([50, 55].includes(endMinutes)) {
        const newEndDateTime = new Date(event.endDateTime)
        newEndDateTime.setMinutes(0)
        newEndDateTime.setHours(newEndDateTime.getHours() + 1)
        event.endDateTime = newEndDateTime
      }
    }
    return event
  }

  /**
   * Match events
   *
   * @param events - Events to match
   * @param configuration - Configuration
   *
   * @returns Events matched to projects, customers and labels
   */
  public matchEvents(
    events: EventObject[],
    configuration?: Record<string, any>
  ): EventObject[] {
    this._configuration = configuration
    return events.map(this._matchEvent.bind(this))
  }
}
