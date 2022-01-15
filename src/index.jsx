import { Auth0Provider } from "@auth0/auth0-react";
import { PrismicProvider } from "@prismicio/react";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { config } from "./config";
import "./index.css";
import { client } from "./prismic";
import * as serviceWorker from "./serviceWorker";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <PrismicProvider client={client}>
      <Auth0Provider
        domain={config.auth0Domain}
        clientId={config.auth0ClientId}
        redirectUri={window.location.origin}
      >
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Auth0Provider>
    </PrismicProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
