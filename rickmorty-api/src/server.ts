import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./interfaces/graphql/schema";
import { resolvers } from "./interfaces/graphql/resolvers";
import { context } from "./interfaces/graphql/context";
import { connectDB } from "./infrastructure/database/sequelize";

import { logger } from "./interfaces/middleware/logger";

import "./infrastructure/cron/character.cron";

const app: any = express();

async function start() {
  await connectDB();
  console.log("DB connected successfully");

  app.use(logger);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();
  console.log("Apollo server started");

  server.applyMiddleware({ app, path: "/graphql" });
  console.log("Apollo middleware applied");

  app.listen(4000, "0.0.0.0", () =>
    console.log("Server running at http://localhost:4000/graphql")
  );

}

start();
