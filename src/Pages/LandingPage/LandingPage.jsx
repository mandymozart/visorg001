import React from "react";
import { FiPhone } from "react-icons/fi";
import FadeIn from "../../Animations/FadeIn";
import Layout from "../../Components/Layout";
import { NewsletterForm } from "../Newsletter/Newsletter";
import { BaseSection } from "./BaseSection";
import { Hero } from "./Hero";

function LandingPage() {
  return (
    <Layout>
      <Hero>
        <h1>
          Welcome to
          <br />
          Vienna Struggle
        </h1>
        <h3>We tell your story.</h3>

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
      <BaseSection>
        <FadeIn>
          <NewsletterForm />
        </FadeIn>
      </BaseSection>
    </Layout>
  );
}

export default LandingPage;
