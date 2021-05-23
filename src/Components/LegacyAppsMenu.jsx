import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  h4 {
    margin: 0;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin-top: 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    border-bottom: 1px solid;
    line-height: 2.5rem;
  }
  li:last-of-type {
    border: 0;
  }

  li:before {
    content: "⟶ ";
  }
`;

export const LegacyAppsMenu = () => {
  return (
    <Container>
      <h4>Legacy Tools</h4>
      <ul>
        <li>
          <Link to={"/epics/create"}>Gitlab Templates</Link>
        </li>
        <li>
          <Link to={"/tracking/add"}>Add Tracking</Link>
        </li>
        <li>
          <Link to={"/tracking/add-organisation-weight"}>Add Weight</Link>
        </li>
      </ul>
    </Container>
  );
};
