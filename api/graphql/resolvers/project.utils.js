const { filter, find } = require('underscore')
const value = require('get-value')

/**
 * Connects projects, customers and labels
 * 
 * @param projects
 * @param customers
 * @param labels
 */
function connectEntities(projects, customers, labels) {
    return projects
        .map(project => ({
            ...project,
            customer: find(customers, c => c.key === project.customerKey),
            labels: filter(labels, lbl => {
                const str = value(project, 'labels', { default: '' })
                return str.indexOf(lbl.name) !== -1
            }),
        }))
        .filter(p => p.customer)
}

module.exports = { connectEntities }