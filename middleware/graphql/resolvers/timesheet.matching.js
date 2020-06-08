const _ = require('underscore')
const { findBestMatch } = require('string-similarity')
const format = require('string-format')
const value = require('get-value')

const CATEGORY_REGEX = /((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}))/gmi
const CONTENT_REGEX = /[\(\{\[]((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}?))[\)\]\}]/gmi

class EventMatching {
    constructor(events, projects, customers, labels) {
        this.events = events
        this.projects = projects
        this.customers = customers
        this.labels = labels
    }

    /**
     * Get project best match using string-similarity findBestMatch
     * 
     * @param {*} customer 
     * @param {*} projectKey 
     */
    getProjectSuggestion(projectKey) {
        try {
            const customerProjects = this.projects.filter(p => p.customerKey === customer.key)
            const projectKeys = customerProjects.map(p => p.id.split(' ')[1])
            const sm = findBestMatch(projectKey, projectKeys)
            const target = (sm.bestMatch && sm.bestMatch.rating > 0) ? sm.bestMatch.target : null
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
     * @param {*} regex 
     * @param {*} input 
     */
    searchString(regex, input) {
        let matches
        let match
        while ((match = regex.exec(input)) != null) {
            matches = matches || []
            matches.push({
                key: `${match.groups.customerKey} ${match.groups.projectKey}`,
                customerKey: match.groups.customerKey,
                projectKey: match.groups.projectKey,
            })
        }
        return matches
    }

    /**
     * Find project match in title/subject/categories
     * 
     * @param {*} content 
     * @param {*} categories 
     */
    findMatches(content, categories) {
        let matches = this.searchString(CATEGORY_REGEX, categories)
        if (matches) return matches
        return this.searchString(CONTENT_REGEX, content)
    }

    /**
     * Checks for project match in event
     */
    matchEvent(event) {
        let categories = event.categories.join(' ').toUpperCase()
        let content = [event.title, event.body, categories].join(' ').toUpperCase()
        let matches = this.findMatches(content, categories)
        let projectKey
        if (matches) {
            for (let i = 0; i < matches.length; i++) {
                let match = matches[i]
                event.customer = _.find(this.customers, c => match.customerKey === c.key)
                if (event.customer) {
                    event.project = _.find(this.projects, p => p.id === match.key)
                    projectKey = match.projectKey
                }
                if (event.project) break
            }
        } else {
            event.project = _.find(this.projects, p => content.indexOf(p.id) !== -1)
            if (event.project) {
                event.customer = _.find(this.customers, c => c.key === event.project.customerKey)
            }
        }
        if (event.customer && !event.project) {
            event.suggestedProject = getProjectSuggestion(this.projects, event.customer, projectKey)
        }
        const inactiveProject = value(event, 'project.inactive')
        const inactiveCustomer = value(event, 'customer.inactive')
        if (event.project && (inactiveProject || inactiveCustomer)) {
            if (inactiveProject)
                event.error = { message: format('Project {0} for {1} is no longer active. Please resolve the event in Outlook.', event.project.name, event.customer.name) }
            if (inactiveCustomer)
                event.error = { message: format('Customer {0} is no longer active. Please resolve the event in Outlook.', event.customer.name) }
            event.project = null
            event.customer = null
        }
        return event
    }

    match() {
        return this.events.map(event => matchEvent(event))
    }
}

module.exports = EventMatching