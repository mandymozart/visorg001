import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import FadeInView from "../Animations/FadeInView";
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
    <FadeInView>
      <Container to={`/project/${project.uid}`}>
        <img src={project.data.image.url} alt={project.data.image.alt}/>
        <h3>{project.data.title}</h3>
        <Status>{project.data.status}</Status> <Tags tags={project.tags} />
      </Container>
    </FadeInView>
  );
};
