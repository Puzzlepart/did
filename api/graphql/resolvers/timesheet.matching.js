const { find, filter, contains } = require('underscore')
const { findBestMatch } = require('string-similarity')
const value = require('get-value')

const CATEGORY_REGEX = /((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}))/gmi
const CONTENT_REGEX = /[\(\{\[]((?<customerKey>[A-Za-z0-9]{2,}?)\s(?<projectKey>[A-Za-z0-9]{2,}?))[\)\]\}]/gmi

class EventMatching {
    constructor(projects, customers, labels) {
        this.projects = projects
        this.customers = customers
        this.labels = labels
    }

    /**
     * Find project suggestions using string-similarity findBestMatch
     * 
     * @param {*} customer 
     * @param {*} projectKey 
     */
    findProjectSuggestion(customer, projectKey) {
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
    findProjectMatches(content, categories) {
        let matches = this.searchString(CATEGORY_REGEX, categories)
        if (matches) return matches
        return this.searchString(CONTENT_REGEX, content)
    }

    /**
     * Find labels
     * 
     * @param {*} categories 
     */
    findLabels(categories) {
        return filter(this.labels, lbl => contains(categories, lbl.name))
    }

    /**
     * Checks for project match in event
     * 
     * @param {*} event 
     */
    matchEvent(event) {
        let categories = event.categories.join(' ').toUpperCase()
        let content = [event.title, event.body, categories].join(' ').toUpperCase()
        let matches = this.findProjectMatches(content, categories)
        let projectKey
        if (matches) {
            for (let i = 0; i < matches.length; i++) {
                let match = matches[i]
                event.customer = find(this.customers, c => match.customerKey === c.key)
                if (event.customer) {
                    event.project = find(this.projects, p => p.id === match.key)
                    projectKey = match.projectKey
                }
                if (event.project) break
            }
        } else {
            event.project = find(this.projects, p => content.indexOf(p.id) !== -1)
            if (event.project) {
                event.customer = find(this.customers, c => c.key === event.project.customerKey)
            }
        }

        if (event.customer && !event.project) event.suggestedProject = this.findProjectSuggestion(
            event.customer,
            projectKey
        )

        event.labels = this.findLabels(event.categories)

        const inactiveProject = value(event, 'project.inactive')
        const inactiveCustomer = value(event, 'customer.inactive')

        if (event.project && (inactiveProject || inactiveCustomer)) {
            if (inactiveProject)
                event.error = { message: `Project ${event.project.name} for ${event.customer.name} is no longer active. Please resolve the event in Outlook.` }
            if (inactiveCustomer)
                event.error = { message: `Customer ${event.customer.name} is no longer active. Please resolve the event in Outlook.` }
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
