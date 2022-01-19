import styled from "@emotion/styled";
import React from "react";
import { FiPhone } from "react-icons/fi";
import Layout from "../../Components/Layout";

export const Hero = styled.div`
  background: #ffff00;
  padding: 1rem;
  padding-bottom: 4rem;
  /* svg {
    margin-bottom: 1.5rem;
  } */
  h1 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }
`;

export const BaseSection = styled.section`
  padding: 1rem;
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;

function LandingPage() {
  return (
    <Layout>
      <Hero>
        <h1>
          Welcome to
          <br />
          Vienna Struggle
        </h1>
        <h3>
          We tell your story.
        </h3>
        
        <p>
          <b>
            Contact Vienna Struggle - Verein für hybride künstlerische Vorhaben
          </b>
          <br />
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
      </Hero>
    </Layout>
  );
}

export default LandingPage;
