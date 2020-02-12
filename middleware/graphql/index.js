const path = require('path');
const graphql = require('express-graphql');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const { StorageService, GraphService } = require('../../services');

const schema = makeExecutableSchema({
  typeDefs: importSchema(path.join(__dirname, './schema.graphql')),
  resolvers: require('./resolvers'),
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
});

module.exports = graphql((req) => ({
  schema: schema,
  rootValue: global,
  graphiql: process.env.GRAPHIQL_ENABLED == '1',
  pretty: req.app.get('env') === 'development',
  context: {
    services: {
      graph: new GraphService(req),
      storage: new StorageService(req.user.profile._json.tid),
    },
    user: req.user,
    tid: req.user.profile._json.tid,
  }
}));
