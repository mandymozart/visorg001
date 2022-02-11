import { Auth0Provider } from "@auth0/auth0-react";
import { PrismicProvider } from "@prismicio/react";
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { default as Web3 } from "web3";
import App from "./App";
import { config } from "./config";
import "./index.css";
import { client } from "./prismic";
import * as serviceWorker from "./serviceWorker";
const queryClient = new QueryClient();

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <PrismicProvider client={client}>
        <Auth0Provider
          domain={config.AUTH0_DOMAIN}
          clientId={config.AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
        >
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Auth0Provider>
      </PrismicProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
