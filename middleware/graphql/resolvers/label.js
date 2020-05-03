const _ = require('underscore');
const { TableBatch } = require('azure-storage');
const { executeBatch } = require('../../../utils/table');

const typeDef = `   
 type Label  {
	id: String
	name: String!
	description: String!
	color: String!
	icon: String
 }

 input LabelInput  {
	id: String
	name: String!
	description: String!
	color: String!
	icon: String
 }
  
  extend type Query {
    labels: [Label!]!
  }  

  extend type Mutation {	
    addLabel(label: LabelInput!): BaseResult   
    updateLabel(label: LabelInput!): BaseResult   
    deleteLabel(id: Int!): BaseResult
  }
`;

async function labels(_obj, _variables, { services: { storage: StorageService } }) {
    let labels = await StorageService.getLabels();
    return labels;
}

async function addLabel(_obj, _variables, { services: { storage: StorageService } }) {

};

async function updateLabel(_obj, _variables, { services: { storage: StorageService } }) {

}

async function deleteLabel(_obj, { id }, { services: { storage: StorageService } }) {
    log('Removing label: %s', JSON.stringify(id));
    try {
        await StorageService.deleteLabel(id);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    }
}

module.exports = {
    resolvers: {
        Query: { labels },
        Mutation: { addLabel, updateLabel, deleteLabel }
    },
    typeDef
}