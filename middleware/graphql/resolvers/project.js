const _ = require('underscore');
const value = require('get-value');

const typeDef = `  
  type Project {
    id: String
    key: String
    name: String
    description: String
    webLink: String
    icon: String
    customerKey: String
    customer: Customer
    inactive: Boolean
    labels: [Label]
  }
  
  extend type Query {
    projects(customerKey: String, sortBy: String): [Project!]!
  }  

  extend type Mutation {
    createProject(customerKey: String!, projectKey: String!, name: String!, description: String!, icon: String!): BaseResult
  }
`;

async function createProject(_obj, variables, { services: { storage: StorageService } }) {
  try {
    log('Attempting to create project in storage: ', JSON.stringify(variables));
    await StorageService.createProject(variables, context.user.profile.oid);
    log('Created project with key %s in storage', variables.projectKey);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: _.omit(error, 'requestId') };
  }
}

async function projects(_obj, variables, { services: { storage: StorageService } }) {
  let [projects, customers, labels] = await Promise.all([
    StorageService.getProjects(variables.customerKey, { sortBy: variables.sortBy }),
    StorageService.getCustomers(),
    StorageService.getLabels(),
  ]);
  projects = projects.map(project => ({
    ...project,
    customer: _.find(customers, customer => customer.id === _.first(project.id.split(' '))),
    labels: _.filter(labels, label => {
      const labels = value(project, 'labels', { default: '' });
      return labels.indexOf(label.id) !== -1;
    }),
  }));
  projects = projects.filter(p => p.customer);
  return projects;
}

module.exports = {
  resolvers: {
    Query: { projects },
    Mutation: { createProject }
  },
  typeDef
}