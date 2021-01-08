import { ApolloServer } from "apollo-server-micro";
import { buildContext } from "../../lib/server/context";
import { schema } from "../../lib/server/schema";

const apolloServer = new ApolloServer({ schema, context: buildContext });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
