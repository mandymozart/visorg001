import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CTA from "../../Components/CTA";
import Footer from "../../Components/Footer";
import Navigation from "../../Components/Navigation";

const Container = styled.div``;

export const Hero = styled.div`
  font-size: 2rem;
  padding: 3rem;
  padding-top: 3rem;
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
  @media only screen and (max-width: 800px) {
    padding: 1rem;
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
  @media only screen and (max-width: 800px) {
    padding: 1rem;
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
            A community that questions classical forms of authorship and
            creative processes.
          </h3>
          <Link to={"/portal"}>
              <CTA className="menu">
                Portal
              </CTA>
            </Link>{" "}
            <Link to={"/releases"}>
              <CTA className="menu">
                Releases
              </CTA>
            </Link>{" "}
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
        <StudioSection>
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
        </StudioSection>
        <Footer />
      </Container>
    </>
  );
}

export default LandingPage;
