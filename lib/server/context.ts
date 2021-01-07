import { InMemoryLRUCache } from "apollo-server-caching";
import { KeyValueCache } from "apollo-server-caching/src/KeyValueCache";
import { IncomingMessage } from "http";
import isFunction, { forIn, has } from "lodash";
import auth0 from "../../lib/auth0";
import { User } from "../../__generated__/lib/graphql-schema";
import { ResContext } from "../res-context";
import { iClaimsToUser } from "../user-utils";

export type CustomContext = ResContext & {
  user: Promise<User | null>;
};

export const serverCache: InMemoryLRUCache = new InMemoryLRUCache();

async function getUserPromise(req?: IncomingMessage): Promise<User | null> {
  if (!req) return null;

  const session = await auth0.getSession(req);
  if (!session || !session.user) return null;
  return iClaimsToUser(session.user);
}

export function buildBlankContext(): CustomContext {
  const context = { user: Promise.resolve(null) };
  return initDS(context, new InMemoryLRUCache());
}

export function buildContext(given: ResContext): CustomContext {
  const context = {
    ...given,
    user: getUserPromise(given.req),
    cache: serverCache,
  };
  return initDS(context, serverCache);
}

function initDS(context: CustomContext, cache: InMemoryLRUCache): CustomContext {
  const initParams = { context, cache };
  forIn(context, (x) => {
    if (isInitializable(x)) {
      x.initialize(initParams);
    }
  });
  return context;
}

interface Initializable {
  initialize: (input: { context: CustomContext; cache: KeyValueCache }) => void;
}

function isInitializable(x: any): x is Initializable {
  return x && has(x, "initialize") && isFunction(x.initialize);
}
