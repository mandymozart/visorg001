import styled from "@emotion/styled";
import React from "react";
import { SimpleProjectListItem } from "./SimpleProjectListItem";

const Container = styled.div`
  max-width: var(--content-width);
  padding-bottom: 4rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SimpleProjectList = ({ projects }) => {
  if (!projects) return null;
  return (
    <Container>
      {projects.map((project) => (
        <div key={project.uid}>
          <SimpleProjectListItem project={project} />
        </div>
      ))}
    </Container>
  );
};

export { SimpleProjectList };
