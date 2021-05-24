import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import Navigation from "../../Components/Navigation";
import PublicBazarSection from "../Projects/PublicBazarSection";
import fist from "./../../images/fist-blood.png";

const Container = styled.div``;

const Hero = styled.div`
  font-size: 2rem;
  padding: 3rem;
  padding-top: 0;
  border-bottom: 1px solid;
  background: #ffff00;
  padding-bottom: 4rem;
  svg {
    margin-bottom: 1.5rem;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
  }
`;

const Notification = styled.div`
  background: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.75rem;
`;

const CTA = styled.a`
  background: #00ff00;
  padding: 1rem;
  border: 2px solid black;
  color: black;
  line-height: 1rem;
  font-size: 1rem;
  border-radius: 2rem;
  &:hover {
    background: black;
    color: #ffff00;
  }
`;

const BaseSection = styled.section`
  padding: 2rem;
  > div {
    width: var(--content-width);
    margin: 0 auto;
  }
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;

const Footer = styled(BaseSection)`
  background: black;
  color: #ffff00;
`;

function LandingPage() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <Notification>
          We are a non-profit organisation. Your donations keep us alive.<br />
          Please become a member of our <b>Patreon</b> and gain access to
          participate in our projects.
        </Notification>
      )}
      <Navigation />
      <Container>
        <Hero>
          <h1>
            Welcome to
            <br />
            Vienna Struggle <img src={fist} height="60px" alt="No mercy" />
          </h1>
          <h3>
            Our mission: Symphonic events exploring digital and analog worlds.
          </h3>
          <div>
            <CTA href="https://soundcloud.com/viennastruggle" rel="noreferrer">
              Soundcloud
            </CTA>{" "}
            <CTA href="https://patreon.com/viennastruggle" rel="noreferrer">
              Patreon
            </CTA>{" "}
            <CTA href="https://viennastruggle.bandcamp.com" rel="noreferrer">
              Bandcamp
            </CTA>{" "}
            <CTA href="mailto:mam@viennastruggle.com" rel="noreferrer">
              Need help?
            </CTA>
          </div>
        </Hero>
        {/* <BaseSection>
          <div>
          <h2>Projects</h2>
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
          </div>
        </BaseSection> */}
        <PublicBazarSection />
        <Footer>
          <div>
            <h2>Location</h2>
            <h3>Portal (XR &amp; Streaming Studio)</h3>
            <p>
              Spittelauer Laende 12/2 / Park &amp; Ride
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
                href="mailto:mandymozart@viennastruggle.com"
                rel="noreferrer"
                target="_blank"
              >
                Reserve a studio visit.
              </CTA>
            </p>
          </div>
        </Footer>
      </Container>
    </>
  );
}

export default LandingPage;
