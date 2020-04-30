import path from 'path';
import graphql from 'express-graphql';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { StorageService } from '../../services/storage';
import { GraphService } from '../../services/graph';

export interface IGraphQLContext {
  services: {
    graph: GraphService;
    storage: StorageService;
  };
  user: any;
  tenantId: string;
}

const schema = makeExecutableSchema({
  typeDefs: importSchema(path.join(__dirname, './schema.graphql')),
  resolvers: require('./resolvers'),
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
});

export default graphql(req => ({
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
    tenantId: req.user.profile._json.tid,
  }
}));
