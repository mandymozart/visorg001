import styled from "@emotion/styled";
import {
  useAllPrismicDocumentsByType
} from "@prismicio/react";
import React from "react";
import Layout from "../../Components/Layout";
import { PageLoader } from "../../Components/Loader";
import { SimpleProjectList } from "../../Components/SimpleProjectList";
import NotFound from "../NotFound";
const Container = styled.div`
  padding: 1rem;
`

const Projects = ({ match }) => {
  const [document, { state, error }] = useAllPrismicDocumentsByType("project");

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded")
    return (
      <Layout>
        <Container>

        <h1>Projects</h1>
        <p>Unstruggle yourself.</p>
        <SimpleProjectList projects={document} />
        </Container>
      </Layout>
    );
  return <PageLoader />;
};

export default Projects;
