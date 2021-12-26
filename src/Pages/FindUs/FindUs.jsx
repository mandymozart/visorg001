import styled from "@emotion/styled";
import React from "react";
import CTA from "../../Components/CTA";
import Layout from "../../Components/Layout";
import { Hero, StudioSection } from "../LandingPage/LandingPage";

const Container = styled.div`
  iframe {
    width: 100%;
    border: 0;
    height: 600px;
  }
`;

function FindUs() {
  return (
    <Container>
      <Layout>

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
      </Layout>
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
    </Container>
  );
}

export default FindUs;
