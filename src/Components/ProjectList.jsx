import styled from "@emotion/styled";
import React from "react";
import { ProjectListItem } from "./ProjectListItem";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-gap: 1rem;
    width: 100%;
    margin-bottom: 1rem;
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
