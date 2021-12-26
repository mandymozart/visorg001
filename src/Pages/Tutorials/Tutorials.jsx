import { useAllPrismicDocumentsByType } from "@prismicio/react";
import React from "react";
import Layout from "../../Components/Layout";
import Loader from "../../Components/Loader";
import { TutorialListItem } from "../../Components/TutorialListItem";
import NotFound from "../NotFound";

const Tutorials = ({ match }) => {
  const [document, { state, error }] = useAllPrismicDocumentsByType("tutorial");

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded") {
    console.log(document)
    return (
      <Layout>
        <h1>Tutorials</h1>
        <p>We share our skills.</p>

        {document.map((tutorial) => (
          <div key={tutorial.uid}>
            <TutorialListItem tutorial={tutorial} />
          </div>
        ))}
      </Layout>
    );
  }
  return <Loader />;
};

export default Tutorials;
