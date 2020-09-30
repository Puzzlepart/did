const { first, find, filter, contains } = require('underscore')
const { findBestMatch } = require('string-similarity')
const value = require('get-value')
const { EVENT_ERROR } = require('./timesheet.utils')

class EventMatching {
  constructor(projects, customers, labels) {
    this.projects = projects
    this.customers = customers
    this.labels = labels
  }

  /**
   * Find project suggestions using findBestMatch from string-similarity
   *
   * @param {*} customer
   * @param {*} projectKey
   */
  findProjectSuggestion(customer, projectKey) {
    try {
      const customerProjects = this.projects.filter(p => p.customerKey === customer.key)
      const projectKeys = customerProjects.map(p => p.id.split(' ')[1])
      const sm = findBestMatch(projectKey, projectKeys)
      const target = sm.bestMatch && sm.bestMatch.rating > 0 ? sm.bestMatch.target : null
      if (!target) return null
      const suggestion = customerProjects.filter(p => p.id.split(' ')[1] === target.toUpperCase())[0]
      return suggestion
    } catch (error) {
      return null
    }
  }

  /**
   * Find project match in title/subject/categories
   *
   * @param {*} input Input string
   * @param {*} soft Soft search - don't require [], () or {}
   */
  searchString(input, soft) {
    let regex = /[\(\{\[]((?<customerKey>[\wæøåÆØÅ]{2,}?)\s(?<key>[\wæøåÆØÅ]{2,}?))[\)\]\}]/gim
    if (soft) regex = /((?<customerKey>[\wæøåÆØÅ]{2,}?)\s(?<key>[\wæøåÆØÅ]{2,}))/gim
    let matches
    let match
    while ((match = regex.exec(input)) != null) {
      matches = matches || []
      matches.push({
        ...match.groups,
        id: `${match.groups.customerKey} ${match.groups.key}`,
      })
    }
    return matches
  }

  /**
   * Find project match in title/body/categories
   *
   * @param {*} searchString Search string (title/body/categories)
   * @param {*} categories Categories
   */
  findProjectMatches(searchString, categories) {
    let matches = this.searchString(categories, true)
    return matches || this.searchString(searchString)
  }

  /**
   * Find label matches in categories
   *
   * @param {*} categories
   */
  findLabels(categories) {
    return filter(this.labels, lbl => contains(categories, lbl.name))
  }

  /**
   * Checks for project match in event
   *
   * 1. Checks category/title/description for tokens
   * 2. Checks title/description for key without any brackets/parantheses
   *
   * @param {*} event
   */
  matchEvent(event) {
    let categories = event.categories.join(' ').toUpperCase()
    let searchString = [event.title, event.body, categories].join(' ').toUpperCase()
    let matches = this.findProjectMatches(searchString, categories)
    let projectKey
    if (matches) {
      let i = 0
      for (let i = 0; i < matches.length; i++) {
        let match = matches[i]
        event.customer = find(this.customers, c => match.customerKey === c.key)
        if (!!event.customer) {
          event.project = find(this.projects, p => p.id === match.id)
          projectKey = match.key
        }
        if (!!event.project) break
      }
    } else {
      event.project = find(this.projects, p => {
        return !!find(this.searchString(searchString, true), m => m.id === p.id)
      })
      if (event.project) event.customer = find(this.customers, c => c.key === event.project.customerKey)
    }
    if (!!event.customer && !event.project) event.suggestedProject = this.findProjectSuggestion(event.customer, projectKey)

    event.labels = this.findLabels(event.categories)
    event = this.checkInactive(event)
    return event
  }

  /**
   * Check if project or customer is marked as inactive
   *
   * @param {*} event
   */
  checkInactive(event) {
    const inactiveProject = value(event, 'project.inactive')
    const inactiveCustomer = value(event, 'customer.inactive')
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
  match(events) {
    return events.map(event => this.matchEvent(event))
  }
}

module.exports = EventMatching
