import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "../Animations/FadeIn";
import Status from "./Status";
import Tags from "./Tags";

const Container = styled(Link)`
  display: block;
  line-height: 1.2;
  padding: 1rem 0;
  h3 {
    margin: 0;
    display: block;
    align-items: center;
  }
  img {
    max-width: 100%;
  }
`;

export const SimpleProjectListItem = ({ project }) => {
  if (!project) return null;
  return (
    <FadeIn>
      <Container to={`/project/${project.uid}`}>
        <h3>{project.data.title}</h3>
        <img src={project.data.image.url} alt={project.data.image.alt}/>
        <Status>{project.data.status}</Status> <Tags tags={project.tags} />
      </Container>
    </FadeIn>
  );
};
