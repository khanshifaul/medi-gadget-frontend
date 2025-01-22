import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export type Context = {
  db: PrismaClient;
};

const db = new PrismaClient();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant",
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ db }),
});

// Explicitly define GET and POST handlers
export const GET = async (req: Request) => {
  return handler(req);
};

export const POST = async (req: Request) => {
  return handler(req);
};
