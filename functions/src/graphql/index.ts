import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import schema from './schema';
import resolvers from './resolvers';

const dev = process.env.NODE_ENV !== "production";

function gqlServer() {
    const app = express();

    const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        // Enable graphiql gui
        introspection: !dev,
        playground: !dev
    });

    apolloServer.applyMiddleware({ app, path: '/', cors: true });

    return app;
}

export default gqlServer;