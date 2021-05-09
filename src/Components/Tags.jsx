import styled from "@emotion/styled";
import React from "react";
import Tag from "./Tag";

const Container = styled.span``;

const Tags = ({ tags }) => {
  return (
    <Container>
      {tags.split(",").map((tag) => {
        tag = tag.trim();
        return <span key={tag}><Tag >{tag}</Tag>{" "}</span>;
      })}
    </Container>
  );
};

export default Tags;
