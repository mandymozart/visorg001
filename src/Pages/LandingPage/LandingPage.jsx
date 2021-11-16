import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { FiPhone } from "react-icons/fi";
import CTA from "../../Components/CTA";
import Footer from "../../Components/Footer";
import Navigation from "../../Components/Navigation";

const Container = styled.div``;

export const Hero = styled.div`
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
  p {
    font-size: 2rem;
    line-height: 1.1;
  }
`;

export const Notification = styled.div`
  background: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.75rem;
`;

export const BaseSection = styled.section`
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

export const StudioSection = styled(BaseSection)`
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
          Currently we are accepting applications for Portal Memberships only.
        </Notification>
      )}
      <Navigation />
      <Container>
        <Hero>
          <h1>
            Welcome to
            <br />
            Vienna Struggle
          </h1>
          <h3>
            Our mission: Symphonic events exploring digital and analog worlds.
          </h3>
          <div>
            <CTA href="https://soundcloud.com/viennastruggle" rel="noreferrer">
              Soundcloud
            </CTA>{" "}
            <CTA
              href="https://www.youtube.com/channel/UC2XVvtE3CD82KMxZY_CljYQ"
              rel="noreferrer"
            >
              YouTube
            </CTA>{" "}
            {/* 
            <CTA href="https://viennastruggle.bandcamp.com" rel="noreferrer">
              Bandcamp
            </CTA>{" "} */}
            <CTA href="mailto:support@viennastruggle.com" rel="noreferrer">
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
        {/* <PublicBazarSection /> */}
        <StudioSection>
          <div>
            <h2>Contact</h2>
            <h3>NGO</h3>
            <p>
              Operngasse 25/12
              <br />
              1040 Wien
              <br />
              Austria
              <br />
              <a href="phone:+436608366059" rel="noreferrer">
                <FiPhone /> +436608366059
              </a>
            </p>
          </div>
        </StudioSection>
        <Footer />
      </Container>
    </>
  );
}

export default LandingPage;
