import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Container = styled.section`
  color: var(--background);
  width: var(--content-width-narrow);
  margin: 0 auto;
  text-align: left;
  p {
    &:first-of-type {
      text-indent: 2rem;
    }
    margin-bottom: 1.5rem;
  }
`;
const ProjectsSection = () => {
  return (
    <Container>
      <h1>Vienna Struggle</h1>
      <p>“Unstruggle Yourself”</p>
      <p>Overcoming failure in the collective – a healing process!</p>
      <p>
        Under the pretence of Vienna as the city with the highest quality of
        life, people‘s everyday struggles fall silent. Our mission is to collect
        individual drowning voices and struggles, and to interpret them via our
        imagining of a futuristic orchestra in songs.
      </p>
      <p>
        Vienna Struggle is an Austrian based community-platform (association)
        founded in April 2019 emerging from creative and cultural workers. We
        are passionate and experienced professionals, curious amateurs and
        visionaries with different backgrounds.
      </p>
      <p>
        As artists, developers, scientists, musicians, designers, consultants,
        students and performers etc. we are united by the idea of bottom up
        empowerment.
      </p>
      <h2>Why?</h2>
      <p>
        Exploring new digital worlds gives music novel powerful ways of
        expression, immersion and embodiment. That’s why the Vienna Struggle
        Orchestra is continuously expanding its instruments using the tools of
        the 21st century. As a group, we collectivise in search of creative and
        economic independence, and to sustain/realise our vision.
      </p>
      <h3>Target group</h3>
      We are the target group! The musicians who want to make films. The
      choreographers who want to make the virtual production their own. The
      videographers who want to play synthesisers. The art and culture workers
      who want to programme. The programmers who want to play grand pianos. The
      pharmacists who want to create virtual worlds. The chemists who want to
      migrate to the Spatial Audio Laboratory. The investment bankers who want
      to play the Shanti accordion. The authors who want to tell
      three-dimensional stories on five axes. The lone fighters who are looking
      for new impulses in a group. The classical orchestra musicians for whom
      Wagner is too bland.
      <h3>Make a virtue of necessity.</h3>
      <p>
        We provide people who want to leave their comfort zones with a safe
        space where they can acquire new skills for artistic expression. We take
        our struggles as super powers that sharpen our skills and create a
        sustainable income stream.
      </p>
      <h3>Support network</h3>
      We emPower social and artistic discourse, process our emotions and
      struggles, celebrate our diversity, integrate any media required for our
      voicing, express and share our strongest visions and utopias, connect with
      our origins or roots. These hybrid entangled environments we create tell
      the stories of the few by the many. We see ourselves as an instrument to
      amplify these voices and make them heard.
      <h2>What?</h2>
      <p>“For most, a regular orchestra is way too expensive to work with.” </p>
      <p>
        We produce films, shows, events, artworks, songs, videos, choir pieces
        and installations.
      </p>
      <h3>Technical challenges</h3>
      <p>
        As a contemporary collective we are constantly seeking new technological
        skills that will enable us to tell our stories and deliver them to
        people globally.
      </p>
      <h3>Work environment</h3>
      <p>
        As creatives working in both indie and corporate environments, we feel
        the need to take the best out of both worlds. We want to establish a
        respectful, challenging and well-organised environment that leads us to
        productivity and creative exchange, innovation and discovery. We need to
        become powerful without excluding our humanity.
      </p>
      <h3>Financial independence for our creative explorations</h3>
      <p>
        To protect our vision, processes and creative explorations, we also need
        financial independence.
      </p>
      <h3>Rethink authorship </h3>
      The goal of Vienna Struggle Collective is to prove that decentralising the
      creative process is one possible way to reinvent authorship, copyright,
      decision making and responsibility. Through asynchronous composition
      people are able to allocate their time to the writing process whenever it
      suits them. By building a composition over time and in an agile way we
      want to support working across time zones and living conditions. By taking
      care of physical as well as language barriers we make Vienna Struggle
      accessible to everyone who wants to be involved in the process.
      <h2>How?</h2>
      <p>We share our resources and infrastructure. Meet the <Link to="/team">team</Link>.</p>
    </Container>
  );
};

export default ProjectsSection;
