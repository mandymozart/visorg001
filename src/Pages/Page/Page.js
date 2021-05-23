import React, { useEffect, useState } from "react";
import { RichText } from "prismic-reactjs";
import { client, linkResolver } from "../../prismic-configuration";
import NotFound from "../NotFound";
import Layout from "../../Components/Layout";

const Page = ({ match }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  const uid = match.params.uid;

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getByUID("page", uid);

      if (result) {
        // We use the State hook to save the document
        return setDocData(result);
      } else {
        // Otherwise show an error message
        console.warn(
          "Page document not found. Make sure it exists in your Prismic repository"
        );
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return (
      <Layout>
        <h1>{RichText.asText(doc.data.title)}</h1>
        <RichText render={doc.data.description} linkResolver={linkResolver} />
        {/* <img src={doc.data.image.url} alt={doc.data.image.alt} /> */}
      </Layout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Page;
