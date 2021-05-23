import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Container = styled(Link)`
    padding: 1rem;
    display: block;
    height: 3rem;
    color: var(--background);
    border: 1px dashed;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  &:hover {
    /* box-shadow: -0.4rem 0.4rem 0 var(--color);
     */
    color: var(--color);
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

export const ProjectListNewItem = () => {
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
      <Container to={`/new`}>
        <h3><FiPlus /> It starts with our passions ...</h3>
      </Container>
    </motion.div>
  );
};
