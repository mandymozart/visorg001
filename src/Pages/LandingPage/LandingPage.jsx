import React from "react";
import { FiPhone } from "react-icons/fi";
import FadeInView from "../../Animations/FadeInView";
import Layout from "../../Components/Layout";
import { NewsletterForm } from "../Newsletter/Newsletter";
import ProjectsSection from "../Projects/ProjectsSection";
import { BaseSection } from "./BaseSection";
import { Hero } from "./Hero";

function LandingPage() {
  return (
    <Layout>
      <Hero>
        <ProjectsSection />
      </Hero>
      <BaseSection>
        <FadeInView>
          <NewsletterForm />
        </FadeInView>
      </BaseSection>
      <BaseSection>
        <FadeInView>
          <p>
            <b>
              Contact Vienna Struggle - Verein für hybride künstlerische
              Vorhaben
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
        </FadeInView>
      </BaseSection>
    </Layout>
  );
}

export default LandingPage;
