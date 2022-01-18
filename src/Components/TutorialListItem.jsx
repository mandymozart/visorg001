import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Tags from "./Tags";

const Container = styled(Link)`
  display: flex;
  line-height: 1.2;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color);
  img {
    max-width: 13rem;
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

export const TutorialListItem = ({ tutorial }) => {
  if (!tutorial) return null;
  console.log(tutorial)
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
      <Container to={`/tutorial/${tutorial.uid}`}>
        <img src={tutorial.data.image.url} alt={tutorial.data.image.alt}/>
        <div>
          <h3>{tutorial.data.title}</h3>
          <Tags tags={tutorial.tags} />
          </div>
      </Container>
    </motion.div>
  );
};
