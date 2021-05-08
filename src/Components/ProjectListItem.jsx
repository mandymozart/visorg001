import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Tags from "./Tags";

const Container = styled.section`
  border: 1px solid;
  margin-bottom: 1rem;
  box-shadow: -0.25rem 0.25rem 0 var(--color);
  border-radius: 0.5rem;
  background: white;
  padding: 1rem;

  h3 {
    margin: 0;
    display: block;
    align-items: center;
  }
`;

export const ProjectListItem = ({ project }) => {
  if (!project) return null;
  return (
    <Link to={`/detail/${project.projectId}`}>
      <Container>
        <h3>{project.title}</h3>
        <Tags tags={project.tags}/>
      </Container>
    </Link>
  );
};
