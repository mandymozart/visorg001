import styled from "@emotion/styled";
import React from "react";

const Container = styled.div``;
const Tag = styled.span`
  border: 1px solid var(--color);
  color: var(--color);
  font-size: 0.75rem;
  padding: 0.1rem 0.25rem;
  margin-right: 0.25rem;
  border-radius: 0.25rem;
`;

const Tags = ({ tags }) => {
  return (
    <Container>
      {tags.split(",").map((tag) => {
        tag = tag.trim();
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </Container>
  );
};

export default Tags;
