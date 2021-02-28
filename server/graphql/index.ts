import {ApolloServer} from 'apollo-server-express';
import {
	ApolloServerPlugin,
	GraphQLRequestContext
} from 'apollo-server-plugin-base';
import createDebug from 'debug';
import express from 'express';
import get from 'get-value';
import {GraphQLDateTime} from 'graphql-iso-date';
import {MongoClient} from 'mongodb';
import 'reflect-metadata';
import {buildSchema, ResolverData} from 'type-graphql';
import Container, {ContainerInstance} from 'typedi';
import env from '../utils/env';
import {authChecker} from './authChecker';
import {Context, createContext} from './context';
import {
	ApiTokenResolver,
	CustomerResolver,
	LabelResolver,
	NotificationResolver,
	OutlookCategoryResolver,
	ProjectResolver,
	ReportsResolver,
	RoleResolver,
	SubscriptionResolver,
	TimesheetResolver,
	UserResolver
} from './resolvers';
const debug = createDebug('graphql');

/**
 * Generate GraphQL schema using type-graphql
 *
 * * Setting up the schema to use Dependency injection (https://typegraphql.com/docs/dependency-injection.html)
 * * Turns of validation
 * * Sets auth checker
 * * Registers GraphQLDateTime scalar type
 *
 * @see https://typegraphql.com/
 */
export const generateGraphQLSchema = async () => {
	const schema = await buildSchema({
		resolvers: [
			ApiTokenResolver,
			CustomerResolver,
			LabelResolver,
			NotificationResolver,
			ReportsResolver,
			TimesheetResolver,
			ProjectResolver,
			OutlookCategoryResolver,
			UserResolver,
			RoleResolver,
			SubscriptionResolver
		],
		container: ({context}: ResolverData<Context>) => context.container,
		emitSchemaFile: true,
		validate: false,
		authChecker,
		dateScalarMode: 'isoDate',
		scalarsMap: [{type: Date, scalar: GraphQLDateTime}]
	});
	return schema;
};

/**
 * Set up GraphQL for the Express Application
 *
 * * Sets up reporting to Apollo Studio
 * * Sets up plugin to reset the container for each request
 *
 * @param app - Express application
 * @param client - Mongo client
 */
export const setupGraphQL = async (
	app: express.Application,
	client: MongoClient
): Promise<void> => {
	try {
		const schema = await generateGraphQLSchema();
		const server = new ApolloServer({
			schema,
			rootValue: global,
			context: async ({req}) => createContext(req, client),
			engine: {
				reportSchema: Boolean(env('APOLLO_KEY')),
				graphVariant: 'current',
				generateClientInfo: ({context}) => ({
					clientName: get(context, 'subscription.name', {default: ''})
				})
			},
			plugins: [
				{
					requestDidStart: () => ({
						willSendResponse(requestContext: GraphQLRequestContext<Context>) {
							debug(
								`Resetting container for request ${requestContext.context.requestId}`
							);
							// Remember to dispose the scoped container to prevent memory leaks
							Container.reset(requestContext.context.requestId);
							const instancesIds = ((Container as any)
								.instances as ContainerInstance[]).map(
								instance => instance.id
							);
							debug('Container instances left in memory: ', instancesIds);
						}
					})
				}
			] as ApolloServerPlugin[]
		});
		server.applyMiddleware({app, path: '/graphql'});
	} catch (error) {
		debug(error);
	}
};

export * from './resolvers/types';
export {
	ApiTokenResolver,
	CustomerResolver,
	LabelResolver,
	NotificationResolver,
	OutlookCategoryResolver,
	ProjectResolver,
	ReportsResolver,
	RoleResolver,
	SubscriptionResolver,
	TimesheetResolver,
	UserResolver
};
