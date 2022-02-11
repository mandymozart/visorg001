import {
  useAllPrismicDocumentsByType
} from "@prismicio/react";
import React from "react";
import Layout from "../../Components/Layout";
import { PageLoader } from "../../Components/Loader";
import { SimpleProjectList } from "../../Components/SimpleProjectList";
import NotFound from "../NotFound";

const Projects = ({ match }) => {
  const [document, { state, error }] = useAllPrismicDocumentsByType("project");

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded")
    return (
      <Layout>
        <h1>Projects</h1>
        <p>Unstruggle yourself.</p>
        <SimpleProjectList projects={document} />
      </Layout>
    );
  return <PageLoader />;
};

export default Projects;
