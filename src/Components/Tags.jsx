import styled from "@emotion/styled";
import React from "react";
import Tag from "./Tag";

const Container = styled.span``;

const Tags = ({ tags }) => {
  return (
    <Container>
      {tags.split(",").map((tag) => {
        tag = tag.trim();
        return <><Tag key={tag}>{tag}</Tag>{" "}</>;
      })}
    </Container>
  );
};

export default Tags;
