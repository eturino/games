import { NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";
import { Box, Heading } from "theme-ui";
import { initializeApolloForServerSide } from "../lib/apollo-server-side";
import { useViewerQuery, ViewerDocument } from "../lib/graphql/client/viewer.graphql";

const ZasGameContainer = dynamic(() => import("../ui/components/games/zas-game/ZasGameContainer"), { ssr: false });

const Index: FunctionComponent = () => {
  const { data } = useViewerQuery();

  if (!data) return <div>Loading...</div>;

  return (
    <Box margin="large">
      <Heading>{data.viewer ? `You are signed in as ${data.viewer.name}` : "Please sign in"}</Heading>

      <ZasGameContainer />
    </Box>
  );
};

export async function getServerSideProps(
  resCtx: GetServerSidePropsContext
): Promise<{
  props: {
    initialApolloState: NormalizedCacheObject;
  };
}> {
  const apolloClient = initializeApolloForServerSide(resCtx);

  await apolloClient.query({
    query: ViewerDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
