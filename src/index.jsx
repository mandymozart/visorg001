import { Auth0Provider } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { PrismicProvider } from "@prismicio/react";
import { Web3ReactProvider } from "@web3-react/core";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { default as Web3 } from "web3";
import App from "./App";
import Loader from "./Components/Loader";
import { config } from "./config";
import "./index.css";
import { client } from "./prismic";
import * as serviceWorker from "./serviceWorker";
const queryClient = new QueryClient();

function getLibrary(provider) {
  return new Web3(provider);
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  height: 100vh;
  width: 100vw;
  position: fixed;
`;

const Dimmer = ({ active, children }) => {
  if (!active) return <></>;
  return <Container>{children}</Container>;
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Dimmer active>
          <Loader />
        </Dimmer>
      }
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <PrismicProvider client={client}>
          <Auth0Provider
            domain={config.AUTH0_DOMAIN}
            clientId={config.AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
          >
            <QueryClientProvider client={queryClient}>
              <App />
              <ReactQueryDevtools position="top-right" />
            </QueryClientProvider>
          </Auth0Provider>
        </PrismicProvider>
      </Web3ReactProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
