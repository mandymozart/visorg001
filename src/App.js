import "./App.css";

import React, { Fragment } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { apiEndpoint } from "./prismic-configuration";
import {
  NotFound,
  Page,
  CreateEpics,
  Add,
  AddOrganisationWeight,
} from "./Pages";
import { ToastProvider } from "react-toast-notifications";
import Header from "./Components/Header";
import Background from "./Components/Background";
import Footer from "./Components/Footer";
import LoginButton from "./Components/LoginButton";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Pages/Profile/Profile";
import LogoutButton from "./Components/LogoutButton";

const AppInner = () => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Fragment>
      <Helmet>
        <script
          async
          defer
          src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
        />
      </Helmet>
      <BrowserRouter>
        <Background />
        <ToastProvider>
          {isAuthenticated ? (
            <div className="App">
              <Header />
              <div className="App-main">
                <Switch>
                  <Redirect exact from="/" to="/login" />
                  <Route exact path="/epics/create" component={CreateEpics} />
                  <Route exact path="/page/:uid" component={Page} />
                  <Route exact path="/login" component={LoginButton} />
                  <Route exact path="/logout" component={LogoutButton} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/tracking/add" component={Add} />
                  <Route
                    exact
                    path="/tracking/add-organisation-weight"
                    component={AddOrganisationWeight}
                  />
                  <Route component={NotFound} />
                </Switch>
                <Footer />
              </div>
            </div>
          ) : (
            <>{isLoading ? "loading..." : <LoginButton />}</>
          )}
        </ToastProvider>
      </BrowserRouter>
    </Fragment>
  );
};

function App() {
  return (
    <Auth0Provider
      domain="viennastruggle.eu.auth0.com"
      clientId="yXFdWoH22B0WZpHjpXwjPTvnY0ihJS7d"
      redirectUri={window.location.origin}
    >
      <AppInner />
    </Auth0Provider>
  );
}

export default App;
