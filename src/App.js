import "./App.css";

import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { apiEndpoint } from "./prismic-configuration";
import { NotFound, Page, CreateEpics, Add, AddOrganisationWeight } from "./Pages";
import { ToastProvider } from "react-toast-notifications";
import Header from "./Components/Header";
import Background from "./Components/Background";
import Footer from "./Components/Footer";

function App() {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];

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
          <div className="App">
            <Header />
            <div className="App-main">
              <Switch>
                <Redirect exact from="/" to="/page/terms" />
                <Route exact path="/epics/create" component={CreateEpics} />
                <Route exact path="/page/:uid" component={Page} />
                <Route exact path="/tracking/add" component={Add} />
                <Route exact path="/tracking/add-organisation-weight" component={AddOrganisationWeight} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </div>
          </div>
        </ToastProvider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
