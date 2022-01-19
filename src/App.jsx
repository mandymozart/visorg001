import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { CgClose } from "react-icons/cg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Navigation from "./Components/Navigation";
import CartPage from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Success from "./Pages/Contact/Success";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateEpics from "./Pages/Epics/Create";
import FindUs from "./Pages/FindUs/FindUs";
import LandingPage from "./Pages/LandingPage/LandingPage";
import NotFound from "./Pages/NotFound";
import Page from "./Pages/Page/Page";
import PortalMembershipForm from "./Pages/Portal/PortalMembershipForm";
import CartLogic from "./Pages/Products/CartLogic";
import Inventory from "./Pages/Products/Inventory";
import Profile from "./Pages/Profile/Profile";
import MyProjects from "./Pages/Projects/MyProjects";
import NewStory from "./Pages/Projects/NewStory";
import Project from "./Pages/Projects/Project";
import Projects from "./Pages/Projects/Projects";
import Statutes from "./Pages/Statutes/Statutes";
import Team from "./Pages/Team/Team";
import Tutorial from "./Pages/Tutorials/Tutorial";
import Tutorials from "./Pages/Tutorials/Tutorials";
import WalletLogic from "./Pages/Wallet/WalletLogic";
import WalletPage from "./Pages/Wallet/WalletPage";

const Container = styled.div``;

const Notification = styled.div`
  background: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.75rem;
`;

const Toast = styled.div`
  display: inline-block;
  padding: 0;
  div {
    display: inline-block;
  }
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
        <Toaster position="bottom-right" toastOptions={{ duration: 5000 }}>
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <Toast onClick={() => toast.dismiss(t.id)}>
                  {icon}
                  {message}
                  {t.type !== "loading" && <CgClose name="close" />}
                </Toast>
              )}
            </ToastBar>
          )}
        </Toaster>
        <Navigation />
        <WalletLogic />
        <CartLogic />
        <Routes>
          {/* <Redirect exact from="/" to="/" /> */}
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/team" element={<Team />} />
          <Route exact path="/statutes" element={<Statutes />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/inventory/*" element={<Inventory />} />
          <Route exact path="/wallet" element={<WalletPage />} />
          <Route exact path="/new-story" element={<NewStory />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/project/:uid" element={<Project />} />
          <Route exact path="/tutorials" element={<Tutorials />} />
          <Route exact path="/tutorial/:uid" element={<Tutorial />} />
          <Route exact path="/page/:uid" element={<Page />} />
          <Route exact path="/epics/create" element={<CreateEpics />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/portal" element={<FindUs />} />
          <Route exact path="/portal/find-us" element={<FindUs />} />
          <Route
            exact
            path="/portal/register"
            element={<PortalMembershipForm />}
          />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/login" element={<LoginButton />} />
          <Route exact path="/logout" element={<LogoutButton />} />
          {isAuthenticated && (
            <>
              <Route exact path="/my-projects" element={<MyProjects />} />
              <Route exact path="/new" element={<NewStory />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/profile" element={<Profile />} />
            </>
          )}
          <Route element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Container>
  );
};

export default App;
