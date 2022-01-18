import styled from "@emotion/styled";
import React from "react";
import Layout from "../../Components/Layout";
import { BaseSection } from "../LandingPage/LandingPage";

const TeamMember = styled.div`
  display: inline-block;
  margin-right: 1rem;
  width: 15rem;
`;

const Team = () => {
  return (
    <Layout>
      <BaseSection>
        <h2>Team</h2>
        <TeamMember>
          <h3>Eva Perner</h3>
          <p>
            Project Coordinator
            <br />
            eva@viennastruggle.com
          </p>
        </TeamMember>
        <TeamMember>
          <h3>Franziska Seifner</h3>
          <p>
            Camera Person
            <br />
            frs@viennastruggle.com
          </p>
        </TeamMember>
        <TeamMember>
          <h3>Bernhard Hammer</h3>
          <p>
            Audio Engineer
            <br />
            beh@viennastruggle.com
          </p>
        </TeamMember>
        <TeamMember>
          <h3>Gerald Herlbauer</h3>
          <p>
            Stream Engineer/VJ
            <br />
            geh@viennastruggle.com
          </p>
        </TeamMember>
        <TeamMember>
          <h3>Mandy Mozart</h3>
          <p>
            Finances
            <br />
            mam@viennastruggle.com
          </p>
        </TeamMember>
      </BaseSection>
    </Layout>
  );
};

export default Team;
