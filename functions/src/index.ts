import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import testRoutes from './controller/routes/routes';

import graphQL from './graphql/server';

const server = graphQL();

const app = express()

app.use(cors())

app.use(testRoutes)

exports.api = functions.https.onRequest(app);
exports.graphql = functions.https.onRequest(server)