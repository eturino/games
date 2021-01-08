import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import React, { FunctionComponent } from "react";
import { ThemeProvider } from "theme-ui";
import { useApollo } from "../lib/apollo";
import theme from "../theme";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
