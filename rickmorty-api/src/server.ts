import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./interfaces/graphql/schema";
import { resolvers } from "./interfaces/graphql/resolvers";
import { context } from "./interfaces/graphql/context";
import { connectDB } from "./infrastructure/database/sequelize";

const app: any = express();

async function start() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(4000, () =>
    console.log("Server running at http://localhost:4000/graphql")
  );
}

start();
