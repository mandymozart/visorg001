import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import CTA from "../../Components/CTA";
import Footer from "../../Components/Footer";
import Navigation from "../../Components/Navigation";
import { Hero, Notification, StudioSection } from "../LandingPage/LandingPage";

const Container = styled.div`
  iframe {
    width: 100%;
    border: 0;
    height: 600px;
  }
`;

function FindUs() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <Notification>
          We are a non-profit organisation. Your donations keep us alive. <br />
          Currently we are accepting applications for Portal Memberships only.
        </Notification>
      )}
      <Navigation />
      <Container>
        <Hero>
          <h1>Find us</h1>
          <div>
            <h2>Portal</h2>
            <p>
              Park &amp; Ride <br />
              Spittelauer Laende 12 / 1 Floor / Parkdeck 3
              <br />
              1090 Wien
              <br />
              Austria
              <br />
              <a href="phone:+436608366059" rel="noreferrer">
                +436608366059
              </a>
            </p>
            <p>
              <CTA
                href="mailto:office@viennastruggle.com"
                rel="noreferrer"
                target="_blank"
              >
                Reserve a studio visit.
              </CTA>
            </p>
          </div>
        </Hero>
        <StudioSection>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2657.527172526606!2d16.358674215333448!3d48.23497857923129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d071fb2895ddf%3A0xcfc072afb1d60cb1!2sVienna%20Struggle%20Portal!5e0!3m2!1sen!2sat!4v1636981125722!5m2!1sen!2sat"
              width="800"
              height="600"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
        </StudioSection>
        <Footer />
      </Container>
    </>
  );
}

export default FindUs;
