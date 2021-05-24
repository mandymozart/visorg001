import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Container = styled.footer`
  background: var(--text);
  padding: 3rem;
  line-height: 1.5rem;
  color: var(--background);
  text-align: center;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    li {
      display:inline;
      padding: 0 .5rem;
      a {
        color: var(--background);
        &:hover {
          color: var(--color);
        }
      }
    }
  }
`;
const Footer = () => {
  return (
    <Container>
      <small>&copy; 2021 Vienna Struggle</small>
      <div>
        <ul>
          <li>
            <Link to="/team">Team</Link>
          </li>
          <li>
            <Link to="/statutes">NGO Statutes</Link>
          </li>
          <li>
            <Link to="/page/terms">Terms</Link>
          </li>
          <li>
            <Link to="/page/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Footer;
