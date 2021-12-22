import styled from "@emotion/styled";
import React from "react";
import { SimpleProjectListItem } from "./SimpleProjectListItem";

const Container = styled.div`
  max-width: var(--content-width-narrow);
  margin-bottom: 1rem;
  margin: 0 auto;
`;

const SimpleProjectList = ({ projects }) => {
  if (!projects) return null;
  return (
    <Container>
      {projects.map((project) => (
        <SimpleProjectListItem key={project.projectId} project={project} />
      ))}
    </Container>
  );
};

export { SimpleProjectList };
