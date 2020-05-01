const _ = require('underscore');

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
  }
  
  extend type Query {
    project(customerKey: String, sortBy: String): [Project!]!
  }  

  extend type Mutation {
    createProject(customerKey: String!, projectKey: String!, name: String!, description: String!, icon: String!): BaseResult
  }
`;

async function createProject(_obj, variables, context) {
    try {
        log('Attempting to create project in storage: ', JSON.stringify(variables));
        await context.services.storage.createProject(variables, context.user.profile.oid);
        log('Created project with key %s in storage', variables.projectKey);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

async function project(_obj, variables, context) {
    let [projects, customers] = await Promise.all([
        context.services.storage.getProjects(variables.customerKey, { sortBy: variables.sortBy }),
        context.services.storage.getCustomers(),
    ]);
    projects = projects.map(p => ({
        ...p,
        customer: _.find(customers, c => c.id === p.id.split(' ')[0]),
    }));
    projects = projects.filter(p => p.customer);
    return projects;
}

module.exports = {
    resolvers: {
        Query: { project },
        Mutation: { createProject }
    },
    typeDef
}