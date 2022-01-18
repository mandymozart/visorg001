import React, { useEffect } from "react";
import { RichText } from "prismic-reactjs";
import NotFound from "../NotFound";
import Layout from "../../Components/Layout";
import { usePrismicDocumentByUID } from "@prismicio/react";
import Loader from "../../Components/Loader";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`padding: 1rem;`

const Page = ({ match }) => {
  const { uid } = useParams();
  const [document, { state, error }] = usePrismicDocumentByUID("page", uid);

  useEffect(() => {
    console.log(state);
  }, [state]);

  if (state === "failed") return <NotFound error={error} />
  else if (state === "loaded") 
    return (
      <Layout>
        <Container>
          <h1>{RichText.asText(document.data.title)}</h1>
          <RichText render={document.data.description} />
        </Container>
      </Layout>
    );
    return <Loader/>
}

export default Page;
