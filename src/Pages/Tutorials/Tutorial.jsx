import styled from "@emotion/styled";
import { useAllPrismicDocumentsByUIDs } from "@prismicio/react";
import { RichText } from "prismic-reactjs";
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import Loader from "../../Components/Loader";
import Tags from "../../Components/Tags";
import NotFound from "../NotFound";

const Container = styled.div`

`;
const Header = styled.header`
  text-align: center;
`;
const Meta = styled.div`
  text-align: center;
  padding: 1rem;
`;
const TeaserImage = styled.img`
  width: 25rem;
`;
const Video = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
  max-width: var(--content-width);
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.section`
  max-width: var(--content-width-narrow);
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 1rem;
`;

const Tutorial = () => {
  const { uid } = useParams();

  const [document, { state, error }] = useAllPrismicDocumentsByUIDs(
    "tutorial",
    [uid]
  );

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded") {
    console.log(document[0]);
    return (
      <Layout>
        <Container>
          <Header>
            {!document[0].data.video.html && document[0].data?.image.url && (
              <TeaserImage
                src={document[0].data.image.url}
                alt={document[0].data.image.alt}
              />
            )}
            <Video
              dangerouslySetInnerHTML={{
                __html: document[0].data.video.html,
              }}
            />
          </Header>
          <Meta>
            <Tags tags={document[0].data.tags} />
          </Meta>
          <Description>
            <h3>{document[0].data.title}</h3>
            <RichText render={document[0].data.content} />
          </Description>
        </Container>
      </Layout>
    );
  }
  return <Loader />;
};

export default Tutorial;
