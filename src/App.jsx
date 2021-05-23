import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateEpics from "./Pages/Epics/Create";
import LandingPage from "./Pages/LandingPage/LandingPage";
import NotFound from "./Pages/NotFound";
import Page from "./Pages/Page/Page";
import Profile from "./Pages/Profile/Profile";
import Detail from "./Pages/Projects/Detail";
import MyProjects from "./Pages/Projects/MyProjects";
import NewProject from "./Pages/Projects/New";
import OpenCalls from "./Pages/Projects/OpenCalls";
import AddOrganisationWeight from "./Pages/Projects/Tracking/AddOrganisationWeight";
import Statutes from "./Pages/Statutes/Statutes";
import Team from "./Pages/Team/Team";
import { apiEndpoint } from "./prismic-configuration";

const Container = styled.div`
  .toggle {
    background: transparent;
    box-shadow: none;
    font-size: 2rem;
  }
`;

const AppInner = () => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Container>
      <Helmet>
        <script
          async
          defer
          src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
        />
      </Helmet>

      <BrowserRouter>
        <ToastProvider>
          <Switch>
            {/* <Redirect exact from="/" to="/" /> */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/statutes" component={Statutes} />
            <Route exact path="/opencalls" component={OpenCalls} />
            <Route exact path="/page/:uid" component={Page} />
            <Route exact path="/project/:projectId" component={Detail} />
            <Route exact path="/epics/create" component={CreateEpics} />
            <Route exact path="/login" component={LoginButton} />
            <Route exact path="/logout" component={LogoutButton} />
            {isAuthenticated && (
              <>
                <Route exact path="/projects" component={MyProjects} />
                <Route exact path="/new" component={NewProject} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/profile" component={Profile} />
                <Route
                  exact
                  path="/tracking/add-organisation-weight"
                  component={AddOrganisationWeight}
                />
              </>
            )}
            <Route component={NotFound} />
          </Switch>
        </ToastProvider>
      </BrowserRouter>
    </Container>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <Auth0Provider
      domain="viennastruggle.eu.auth0.com"
      clientId="yXFdWoH22B0WZpHjpXwjPTvnY0ihJS7d"
      redirectUri={window.location.origin}
    >
      <QueryClientProvider client={queryClient}>
        <AppInner />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default App;
