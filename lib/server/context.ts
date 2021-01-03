import { InMemoryLRUCache } from "apollo-server-caching";
import { IncomingMessage } from "http";
import auth0 from "../../lib/auth0";
import { User } from "../../__generated__/lib/graphql-schema";
import { ResContext } from "../res-context";
import { iClaimsToUser } from "../user-utils";
import { GameDataSource } from "./game-data-source";

export type CustomContext = ResContext & {
  user: Promise<User | null>;
  gameDataSource: GameDataSource<CustomContext>;
};

export const serverCache: InMemoryLRUCache = new InMemoryLRUCache();

async function getUserPromise(req?: IncomingMessage): Promise<User | null> {
  if (!req) return null;

  const session = await auth0.getSession(req);
  if (!session || !session.user) return null;
  return iClaimsToUser(session.user);
}

export function buildBlankContext(): CustomContext {
  const context = { user: Promise.resolve(null), gameDataSource: new GameDataSource<CustomContext>() };
  return initDS(context, new InMemoryLRUCache());
}

export function buildContext(given: ResContext): CustomContext {
  const context = {
    ...given,
    user: getUserPromise(given.req),
    cache: serverCache,
    gameDataSource: new GameDataSource(),
  };
  return initDS(context, serverCache);
}

function initDS(context: CustomContext, cache: InMemoryLRUCache): CustomContext {
  context.gameDataSource.initialize({ context, cache });
  return context;
}
