import { NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { Box } from "theme-ui";
import { initializeApolloForServerSide } from "../../lib/apollo-server-side";
import { GameDocument, useGameQuery } from "../../lib/graphql/client/game.graphql";
import { getStringParam } from "../../src/utils/string-utils";

const Index: FunctionComponent = () => {
  const router = useRouter();
  const id = getStringParam(router.query.id);

  const { data } = useGameQuery({ variables: { id } });

  if (!data) return <div>Loading...</div>;

  const game = data.game;

  return (
    <Box margin="large">
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </Box>
  );
};

export async function getServerSideProps(
  resCtx: GetServerSidePropsContext
): Promise<{
  props: {
    initialApolloState: NormalizedCacheObject | null;
  };
}> {
  const id = resCtx.params?.id;
  if (!id) return { props: { initialApolloState: null } };

  const apolloClient = initializeApolloForServerSide(resCtx);

  await apolloClient.query({
    query: GameDocument,
    variables: { id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
