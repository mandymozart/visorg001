import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
  padding: 2rem;
  margin: 0 auto;
  width: var(--content-width);
  /* max-width: 50rem; */
  margin: 2rem;
  border: 2px solid black;
  header {
    position: sticky;
    top: 0;
    border-bottom: 2px solid black;
    background: rgba(255, 255, 0, 0.7);
    img {
      width: calc(100% - 4rem);
      margin: 2rem;
    }
  }
  .ctas {
    line-height: 4rem;
  }
`;

const BaseSection = styled.section`
  padding: 2rem;
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;

const TimelineItemContainer = styled.div``;

const TimelineItem = ({ title, description, image, video, children }) => {
  return (
    <TimelineItemContainer>
      <div>
        <h3>{title}</h3>
        {video && <>Video Url: {video}</>}
        {image && <img src={image.src} alt={image.caption} />}
        <p>{description}</p>
        {children}
      </div>
    </TimelineItemContainer>
  );
};

const History = () => {
  return (
    <Container>
      <BaseSection>
        <h2>History</h2>
        <p>
          We started a little bit before Covid-19 hit us. We wanted to do
          something radically new to keep the bass and the volume and the
          trance, but get a little less chaotic, hedonist and chauvinist. For
          almost two years we operated as an NGO to experiment and define our
          processes revolutionizing the creative process of musical
          collaboration.
        </p>
        <Chrono mode="VERTICAL_ALTERNATING">
          <TimelineItem title="2018 - Vienna Struggle e.V." />
          <TimelineItem
            title="2019 - Club der ersten Stunde"
            description="First creative camp at Robert Karasek Vineyard"
          />
          <TimelineItem title="2019 - Emika Concert in Vienna" />
          <TimelineItem
            title="2020 - Founding of Vienna Struggle Media GmbH"
            description="
          Streaming productions for viennacontemporary, austrian film academy,
          kino der kunst, interface film, wien woche, business riot, period,
          etc."
          />
          <TimelineItem title="2020 - Regular radio shows on res.radio" />
          <TimelineItem title="2020 - Strudle.io goes online" />
          <TimelineItem title="2021 - Album Snaw Crosh is released">
            <a
              href="https://fanlink.to/snawcrosh"
              target="_blank"
              rel="noreferrer"
            >
              Snaw Crosh on spotify, etc.
            </a>{" "}
          </TimelineItem>
          <TimelineItem
            title="2021 - Company split"
            description="Splitting up into Vienna Struggle e.V. and Strudle.io Media
          &amp; Services GmbH"
          />
          <TimelineItem title="2021 - Portal is opened" />
        </Chrono>
        <p>
          This is just the begining of our journey which we want to last for at
          least ten full years. We'd love to see how we can transport our
          colorful history and inspiring past into the next centuries.
        </p>
        <p>
          Stricly following technocratic design processes, there is no
          conductor, no composer, only a holocratic process, circles and roles
          that fluidly self determine their contribution to the Gesamtkunstwerk.
        </p>
      </BaseSection>
    </Container>
  );
};

export default History;