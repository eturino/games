import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initializeApollo } from "./apollo";
import { ResContext } from "./res-context";
import { buildContext } from "./server/context";

export function initializeApolloForServerSide(resCtx: ResContext): ApolloClient<NormalizedCacheObject> {
  return initializeApollo(null, buildContext(resCtx));
}
