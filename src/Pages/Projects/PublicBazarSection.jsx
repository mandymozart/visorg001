import styled from "@emotion/styled";
import React from "react";
import Kanban from "../../Components/Kanban";
import { useGetProjects } from "../../Hooks/Queries";

const Container = styled.section`
  padding: 2rem;
  background: black;
  color: var(--background);
  > div {
    width: var(--content-width);
    margin: 0 auto;
  }
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;
const PublicBazarSection = () => {
  const { error, isLoading, data } = useGetProjects();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      {/* <div className="page__header"> */}
      {/* <h3>Progress Bazar</h3>
        <p>
          We are producing symphonic music and events in a modern way.
          Interested in joining one of our exciting projects? Learn more and
          apply!
        </p> */}
      {/* </div> */}

      <Kanban
        drafts={data.message.filter((item) => item.status === "draft")}
        opencalls={data.message.filter((item) => item.status === "opencall")}
        done={data.message.filter((item) => item.status === "done")}
      />
    </Container>
  );
};

export default PublicBazarSection;
