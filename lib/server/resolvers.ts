import { MutationResolvers, QueryResolvers } from "../../__generated__/lib/graphql-schema";
import { CustomContext } from "./context";

const Query: Required<QueryResolvers<CustomContext>> = {
  async viewer(_parent, _args, context, _info) {
    const user = await context.user;
    return user ?? null;
  },

  game(_parent, { id }, context) {
    return context.gameDataSource.getGame(id);
  },
};

const Mutation: Required<MutationResolvers<CustomContext>> = {
  createGame(_parent, { input }, context) {
    console.log(`[createGame]`, input);
    return context.gameDataSource.getGame("new-game");
  },
  joinGame(_parent, { id }, context) {
    return context.gameDataSource.getGame(id);
  },
  endGame(_parent, { id }, context) {
    return context.gameDataSource.getGame(id);
  },
};

export default { Query, Mutation };
