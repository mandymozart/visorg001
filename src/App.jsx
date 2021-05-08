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
import Header from "./Components/Header";
import LoginButton from "./Components/LoginButton";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Pages/Profile/Profile";
import LogoutButton from "./Components/LogoutButton";
import { QueryClient, QueryClientProvider } from "react-query";
import NewProject from "./Pages/Projects/New";
import Bazar from "./Pages/Projects/Bazar";
import styled from "@emotion/styled";
import Detail from "./Pages/Projects/Detail";
import MyProjects from "./Pages/Projects/MyProjects";

const Container = styled.div`
  .toggle {
    background: transparent;
    box-shadow: none;
    font-size: 2rem;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 15rem auto 15rem;
  min-height: 100vh;
`;

const Content = styled.div`
  overflow: auto;
  height: 100vh;
  background-image: linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%);  
  div > h2 {
    text-align: center;
  }
  > div {
    padding: 1rem;
  }
`;

const Information = styled.div`
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
    padding:1rem;
    img {
      width: 100%;
    }
  }
`;

const AppInner = () => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];
  const { isAuthenticated, isLoading } = useAuth0();
  const [collapsed, setCollapsed] = useState(false);

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
              <Header isCollapsed={collapsed} />
              <Content>
                <div>
                  <button
                    className="toggle"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <span role="img" aria-labelledby="epics">
                      {collapsed ? "👋" : "👊"}
                    </span>
                  </button>
                  <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route exact path="/projects" component={MyProjects} />
                    <Route exact path="/bazar" component={Bazar} />
                    <Route exact path="/new" component={NewProject} />
                    <Route exact path="/detail/:projectId" component={Detail} />
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
            <>{isLoading ? "loading..." : <LoginButton />}</>
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
