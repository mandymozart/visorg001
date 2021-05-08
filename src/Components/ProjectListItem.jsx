import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Tags from "./Tags";
import Status from "./Status";

const Container = styled(Link)`
  border: 1px solid;
  box-shadow: -0.25rem 0.25rem 0 var(--color);
  border-radius: 0.5rem;
  background: white;
  padding: 1rem;
  display: block;
  &:hover {
    box-shadow: -0.4rem 0.4rem 0 var(--color);
  }

  h3 {
    margin: 0;
    display: block;
    align-items: center;
  }
`;

export const ProjectListItem = ({ project }) => {
  if (!project) return null;
  return (
    <Container to={`/detail/${project.projectId}`}>
      <h3>{project.title}</h3>
      <Status>{project.status}</Status> <Tags tags={project.tags} />
    </Container>
  );
};
