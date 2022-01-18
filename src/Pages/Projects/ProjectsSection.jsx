import styled from "@emotion/styled";
import React from "react";
import TextLoop from "react-text-loop";
import { SimpleProjectList } from "../../Components/SimpleProjectList";

const Container = styled.section`
  color: var(--background);
  text-align: left;
  padding: 1rem;
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;
const ProjectsSection = ({ projects }) => {
  console.log(projects);
  return (
    <Container>
      <div className="page__header">
        <h1>Releases</h1>
        <p>
          We share our stories of through music.
          <br />
          Our stories talk of <br />
          <TextLoop>
            <span>emotional </span>
            <span>physical </span>
            <span>ancestral</span>
            <span>mental</span>
            <span>identity</span>
            <span>orientational</span>
            <span>political</span>
          </TextLoop>{" "}
          &nbsp;struggles, <br />
          &mdash; <br />
          Struggles to adopt to a new age.
          <br />
        </p>
      </div>

      <SimpleProjectList projects={projects} />
    </Container>
  );
};

export default ProjectsSection;
