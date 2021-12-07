import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import Footer from "../../Components/Footer";
import Navigation from "../../Components/Navigation";
import { Hero, Notification } from "../LandingPage/LandingPage";

const Container = styled.div`
  iframe {
    width: 100%;
    border: 0;
    height: 600px;
  }
`;

function PortalMembershipForm() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <Notification>
          Currently we are accepting applications for Portal Memberships only.
        </Notification>
      )}
      <Navigation />
      <Container>
        <Hero>
          {/* <h1>Become a portal member</h1> */}
          <div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfo5-nXwlYybbmqYt1rSECQ0Tw2hOq8jOYH1dHrrjEgohkwIg/viewform?embedded=true"
              width="100%"
              height="2415"
              title="google-form"
              frameorder="0"
              marginheight="0"
              marginwidth="0"
            >
              Is loading ...
            </iframe>
          </div>
        </Hero>
        <Footer />
      </Container>
    </>
  );
}

export default PortalMembershipForm;
