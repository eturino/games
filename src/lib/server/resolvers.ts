import { QueryResolvers } from "../../__generated__/lib/graphql-schema";
import { CustomContext } from "./context";

const Query: Required<QueryResolvers<CustomContext>> = {
  async viewer(_parent, _args, context, _info) {
    const user = await context.user;
    return user ?? null;
  },
};

export default { Query };
