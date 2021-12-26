import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import Footer from "./Components/Footer";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Navigation from "./Components/Navigation";
import Contact from "./Pages/Contact/Contact";
import Success from "./Pages/Contact/Success";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateEpics from "./Pages/Epics/Create";
import FindUs from "./Pages/FindUs/FindUs";
import LandingPage from "./Pages/LandingPage/LandingPage";
import NotFound from "./Pages/NotFound";
import Page from "./Pages/Page/Page";
import PortalMembershipForm from "./Pages/Portal/PortalMembershipForm";
import Profile from "./Pages/Profile/Profile";
import MyProjects from "./Pages/Projects/MyProjects";
import NewProject from "./Pages/Projects/NewProject";
import Project from "./Pages/Projects/Project";
import Projects from "./Pages/Projects/Projects";
import Statutes from "./Pages/Statutes/Statutes";
import Team from "./Pages/Team/Team";

const Container = styled.div``;

const Notification = styled.div`
  background: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.75rem;
`;

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Container>
      <BrowserRouter>
        {!isAuthenticated && (
          <Notification>
            Currently we are accepting applications for Portal Memberships only.
          </Notification>
        )}
        <Navigation />
        <ToastProvider>
          <Switch>
            {/* <Redirect exact from="/" to="/" /> */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/statutes" component={Statutes} />
            <Route exact path="/projects/:status" component={Projects} />
            <Route exact path="/project/:uid" component={Project} />
            <Route exact path="/page/:uid" component={Page} />
            <Route exact path="/epics/create" component={CreateEpics} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/portal" component={FindUs} />
            <Route exact path="/portal/find-us" component={FindUs} />
            <Route
              exact
              path="/portal/register"
              component={PortalMembershipForm}
            />
            <Route exact path="/success" component={Success} />
            <Route exact path="/login" component={LoginButton} />
            <Route exact path="/logout" component={LogoutButton} />
            {isAuthenticated && (
              <>
                <Route exact path="/my-projects" component={MyProjects} />
                <Route exact path="/new" component={NewProject} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/profile" component={Profile} />
              </>
            )}
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </ToastProvider>
      </BrowserRouter>
    </Container>
  );
};

export default App;
