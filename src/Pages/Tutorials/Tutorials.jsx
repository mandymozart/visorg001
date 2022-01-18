import styled from "@emotion/styled";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import Loader from "../../Components/Loader";
import { TutorialListItem } from "../../Components/TutorialListItem";
import NotFound from "../NotFound";
const Container = styled.div`
  padding: 1rem;
  max-width: var(--content-width);
`;
const Tutorials = ({ match }) => {
  const [document, { state, error }] =
    useAllPrismicDocumentsByType("tutorial");

  useEffect(() => {
    console.log(document);
  }, [document]);

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded") {
    return (
      <Layout>
        <Container>
          <h1>Tutorials</h1>
          <p>We love share our skills.</p>
        </Container>

        {document.map((tutorial) => (
          <div key={tutorial.data.uid}>
            <TutorialListItem tutorial={tutorial} />
          </div>
        ))}
      </Layout>
    );
  }
  return <Loader />;
};

export default Tutorials;
