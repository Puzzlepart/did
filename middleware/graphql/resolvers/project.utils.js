const { filter, find } = require('underscore')
const value = require('get-value')

/**
 * Combines projects, customers and labels
 * 
 * @param projects
 * @param customers
 * @param labels
 */
function enrichProjects(projects, customers, labels) {
    return projects
        .map(project => ({
            ...project,
            customer: find(customers, c => c.key === project.customerKey),
            labels: filter(labels, label => {
                const labels = value(project, 'labels', { default: '' })
                return labels.indexOf(label.id) !== -1
            }),
        }))
        .filter(p => p.customer)
}

module.exports = { enrichProjects }