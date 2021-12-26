import {
  useAllPrismicDocumentsByType
} from "@prismicio/react";
import React from "react";
import Layout from "../../Components/Layout";
import Loader from "../../Components/Loader";
import NotFound from "../NotFound";
import ProjectsSection from "./ProjectsSection";

const Projects = ({ match }) => {
  const [document, { state, error }] = useAllPrismicDocumentsByType("project");

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded")
    return (
      <Layout>
        {/* <h1>{match.params.status}</h1> */}
        <ProjectsSection projects={document} />
      </Layout>
    );
  return <Loader />;
};

export default Projects;
