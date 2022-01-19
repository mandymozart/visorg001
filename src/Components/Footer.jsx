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
      /* display: inline; */
      padding: 0 0.5rem;
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
      <ul>
        <li>Struggle</li>
        <li>
          <Link to={"/projects"}>Stories</Link>{" "}
        </li>
        <li>
          <Link to={"/portal"}>Portal</Link>{" "}
        </li>
        <li>
          <Link to={"/tutorials"}>Tutorials</Link>{" "}
        </li>
      </ul>
      <ul>
        <li>Third-Party</li>
        <li>
          <a href="https://soundcloud.com/viennastruggle" rel="noreferrer">
            Soundcloud
          </a>{" "}
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UC2XVvtE3CD82KMxZY_CljYQ"
            rel="noreferrer"
          >
            YouTube
          </a>{" "}
        </li>
        <li>
          <a href="mailto:support@viennastruggle.com" rel="noreferrer">
            Need help?
          </a>
        </li>
      </ul>

      <ul>
        <li>Operations</li>
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
      <small>&copy; 2021 Vienna Struggle</small>
    </Container>
  );
};

export default Footer;
