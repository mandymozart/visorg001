import React, { useState } from "react";
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
import Sidebar from "./Components/Sidebar";
import LoginButton from "./Components/LoginButton";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Pages/Profile/Profile";
import LogoutButton from "./Components/LogoutButton";
import { QueryClient, QueryClientProvider } from "react-query";
import NewProject from "./Pages/Projects/New";
import styled from "@emotion/styled";
import Detail from "./Pages/Projects/Detail";
import MyProjects from "./Pages/Projects/MyProjects";
import OpenCalls from "./Pages/Projects/OpenCalls";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Header from "./Components/Header";

const Container = styled.div`
  .toggle {
    background: transparent;
    box-shadow: none;
    font-size: 2rem;
  }
`;

const Layout = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-columns: auto var(--sidebar-width);
  grid-template-areas:
    "header header"
    "content information";
  margin: 0;
  transition: all 1s;
`;

const Content = styled.div`
  grid-area: content;
  min-height: var(--content-height);
  div > h2 {
    text-align: center;
  }
  // Inner
  > div {
    padding: 1rem;
    width: var(--content-width);
    margin:0 auto;
  }
`;

const Information = styled.div`
  grid-area: information;
  height: 100vh;
  text-align: center;
  overflow: auto;
  /* border-left: 1px solid black; */
  small {
    display: block;
    padding: 1rem;
  }
  a {
    display: block;
    padding: 1rem;
    img {
      width: 100%;
    }
  }
`;

const AppInner = () => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];
  const { isAuthenticated, isLoading } = useAuth0();
  const [isCollapsed, setIsCollapsed] = useState(true);

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
          {isAuthenticated ? (
            <Layout>
              <Header
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
              <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
              <Content>
                <div>
                  <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <Route exact path="/projects" component={MyProjects} />
                    <Route exact path="/opencalls" component={OpenCalls} />
                    <Route exact path="/new" component={NewProject} />
                    <Route exact path="/project/:projectId" component={Detail} />
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
                </div>
              </Content>
              <Information>
                <small>Adverstiment</small>
                <a
                  href="https://fanlink.to/snawcrosh"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src={"https://f4.bcbits.com/img/a3814062337_2.jpg"}
                    alt="Advertisment - Snaw Crosh"
                  />
                </a>
              </Information>
            </Layout>
          ) : (
            <>{isLoading ? "loading..." : <LandingPage />}</>
          )}
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
