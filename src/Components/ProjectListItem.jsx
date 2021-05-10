import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Tags from "./Tags";
import Status from "./Status";
import { motion } from "framer-motion";

const Container = styled(Link)`
  box-shadow: -0.25rem 0.25rem 0 var(--color);
  border-radius: 0.5rem;
  background-color: var(--card-background);
  background-image: var(--card-background-image);
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

export const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const ProjectListItem = ({ project }) => {
  if (!project) return null;
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <Container to={`/project/${project.projectId}`}>
        <h3>{project.title}</h3>
        <Status>{project.status}</Status> <Tags tags={project.tags} />
      </Container>
    </motion.div>
  );
};
