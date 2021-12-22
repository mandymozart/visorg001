import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Status from "./Status";
import Tags from "./Tags";

const Container = styled(Link)`
  display: block;
  line-height: 1.2;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color);
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

export const SimpleProjectListItem = ({ project }) => {
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
