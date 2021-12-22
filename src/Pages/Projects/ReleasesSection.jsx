import styled from "@emotion/styled";
import React from "react";
import { SimpleProjectList } from "../../Components/SimpleProjectList";
import { useGetProjects } from "../../Hooks/Queries";

const Container = styled.section`
  color: var(--background);
  text-align: center;
  img {
    max-width: 100%;
    &.full {
      width: 100%;
    }
  }
`;
const ReleasesSection = () => {
  const { error, isLoading, data } = useGetProjects({ status: "done" });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container>
      <div className="page__header">
        <h1>Releases</h1>
        <p>
          We share our stories of through music.<br />
          Our stories talk of <br />
          emotional struggles, <br />
          physical struggles, <br />
          ancestral struggles,<br />
          mental struggles,<br />
          identity struggles,<br />
          orientational struggles &amp;<br />
          political struggles<br />
          &mdash; <br />
          Struggles to adopt to a new age.<br />
        </p>
      </div>

      <SimpleProjectList projects={data.message} />
    </Container>
  );
};

export default ReleasesSection;
