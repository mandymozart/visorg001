import styled from "@emotion/styled";
import React from "react";
import { ProjectListItem } from "./ProjectListItem";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
    width: 100%;
`;

export default ({ projects }) => {
  if (!projects) return null;
  return (
    <Container>
      {projects.map((project) => (
        <ProjectListItem key={project.projectId} project={project} />
      ))}
    </Container>
  );
};
