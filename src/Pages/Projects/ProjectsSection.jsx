import styled from "@emotion/styled";
import React from "react";
import { CgArrowLongRightC } from "react-icons/cg";
import { GiMusicalNotes } from "react-icons/gi";
import { RiQuillPenFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import TextLoop from "react-text-loop";
import { PrimaryButton } from "../../Components/FormElements/Button";

const Container = styled.section`
  color: var(--background);
  width: var(--content-width-narrow);
  margin: 0 auto;
  text-align: left;
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;
const ProjectsSection = () => {
  return (
    <Container>
      <h1>
        We tell stories of{" "}
        <TextLoop>
          <span>emotional </span>
          <span>physical </span>
          <span>ancestral</span>
          <span>mental</span>
          <span>identity</span>
          <span>political</span>
        </TextLoop>{" "}
        struggle <br />
        through music.
        <br />
        &mdash; <br />
      </h1>
      <h1>
        <RiQuillPenFill /> <CgArrowLongRightC /> <GiMusicalNotes />
      </h1>

      <h3>
        You share your story with us!
        <br /> We share it with the beings on this planet and beyond!
      </h3>
      <p>
        Our stories are crowdsourced stories of strugglers from around the
        world. We want to hear about the little stories, the big stories, and
        the sad stories you have or had adopting to a new age. Together we will
        always be louder!
      </p>
      <h3>How does it work?</h3>
      <ul>
        <li>
          First, read some of our{" "}
          <Link to="/stories">
            <PrimaryButton>community stories</PrimaryButton>
          </Link>{" "}
          and dive into struggles from around the world. Upvote the ones you
          liked!{" "}
        </li>
        <li>
          Second, you with{" "}
          <Link to="/stories/submit">
            <PrimaryButton>share your story</PrimaryButton>
          </Link>{" "}
          us!
        </li>
        <li>
          Third, when ever we have time to start our next song, we take stories
          from the most upvoted on the page and turn it into a project.
        </li>
        <li>
          Fourth, selected project receive project funding from us and creatives
          can apply via
          <Link to="/opencalls">
            <PrimaryButton>open calls</PrimaryButton>
          </Link>{" "}
          .
        </li>
        <li>
          Finally, we release the{" "}
          <Link to="/opencalls">
            <PrimaryButton>music videos</PrimaryButton>
          </Link>{" "}
          and your story becomes legend.
        </li>
      </ul>
      <h3>Why share your stories with us?</h3>
      <p>
        Because we share the profits and we make each other heard. Creating
        together with people that care about stuff that matters, like really
        really care, gives us strength and heals our wunds. And because we are
        sick of manufactured feel good managers!
      </p>
    </Container>
  );
};

export default ProjectsSection;
