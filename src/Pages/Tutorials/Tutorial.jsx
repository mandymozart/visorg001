import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { useAllPrismicDocumentsByUIDs } from "@prismicio/react";
import { RichText } from "prismic-reactjs";
import React from "react";
import Layout from "../../Components/Layout";
import Loader from "../../Components/Loader";
import Tags from "../../Components/Tags";
import NotFound from "../NotFound";

const Header = styled.header`
  text-align: center;
`;
const Meta = styled.div`
  text-align: center;
`;
const TeaserImage = styled.img`
  width: 25rem;
`;
const Description = styled.section`
  max-width: var(--content-width-narrow);
  font-size: 1.2rem;
  margin: 0 auto;
`;

const Tutorial = ({ match }) => {
  const uid = match.params.uid;
  const { user } = useAuth0();
  const [document, { state, error }] = useAllPrismicDocumentsByUIDs(
    "tutorial",
    [uid]
  );

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded") {
    console.log(document[0]);
    return (
      <Layout>
        <>
          <Header>
            <h3>{document[0].data.title}</h3>
            {document[0].data?.image.url && (
              <TeaserImage
                src={document[0].data.image.url}
                alt={document[0].data.image.alt}
              />
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: document[0].data.video.html,
              }}
            />
          </Header>
          <Meta>
            <Tags tags={document[0].data.tags} />
          </Meta>
          <Description>
            <RichText render={document[0].data.content} />
          </Description>
        </>
      </Layout>
    );
  }
  return <Loader />;
};

export default Tutorial;
