import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import FadeInView from "../Animations/FadeInView";
import ViennaStruggleLogo from "./ViennaStruggleLogo";

const Container = styled.footer`
  background: var(--background-invert);
  padding: 3rem;
  line-height: 1.5rem;
  color: var(--background);
  text-align: center;
  @media screen and (min-width: 600px) {
    display: flex;
    gap: 3rem;
    text-align: left;
    padding-bottom: 8rem;
  }
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    li {
      /* display: inline; */
      padding: 0 0.5rem;
      h5 {
        margin: 0;
        color: var(--background);
        text-transform: uppercase;
      }
      &:first-of-type {
        margin-bottom: 0.5rem;
      }
      a {
        color: var(--background);
        &:hover {
          color: var(--color);
        }
      }
    }
  }
  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--fourth);
    border-radius: 0.5rem;
    padding: 2rem;
    svg {
      margin-bottom: 0;
    }
  }
`;
const Footer = () => {
  return (
    <FadeInView>
      <Container>
        <div>
          <ViennaStruggleLogo />
          <br />
          <small>&copy; 2022</small>
        </div>
        <ul>
          <li>
            <h5>Struggle</h5>
          </li>
          <li>
            <Link to={"/projects"}>Projects</Link>{" "}
          </li>
          <li>
            <Link to={"/portal"}>Portal</Link>{" "}
          </li>
          <li>
            <Link to={"/tutorials"}>Tutorials</Link>{" "}
          </li>
          <li>
            <a href={"https://struggle.tv"} rel="noreferrer">
              Sessions
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <h5>Third-Party</h5>
          </li>
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
          <li>
            <h5>Operations</h5>
          </li>
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
      </Container>
    </FadeInView>
  );
};

export default Footer;
