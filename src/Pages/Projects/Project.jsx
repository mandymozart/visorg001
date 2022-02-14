import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import { useAllPrismicDocumentsByUIDs } from "@prismicio/react";
import { RichText } from "prismic-reactjs";
import React from "react";
import { useParams } from "react-router-dom";
import FadeInView from "../../Animations/FadeInView";
import Layout from "../../Components/Layout";
import { PageLoader } from "../../Components/Loader";
import Role from "../../Components/Role";
import Tags from "../../Components/Tags";
import NotFound from "../NotFound";
import { Video } from "../Tutorials/Tutorial";

const Header = styled.header`
  text-align: center;
`;
const Meta = styled.div`
h3 {
  margin-top: 2rem;
}
  text-align: center;
  padding: 1rem;
`;
const TeaserImage = styled.img`
  max-width: var(--form-width);
  margin: 0 auto;
`;
const Description = styled.section`
  max-width: var(--content-width-narrow);
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 1rem;
  p {
    text-indent: 2rem;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Project = () => {
  const { uid } = useParams();
  const { user } = useAuth0();
  const [document, { state, error }] = useAllPrismicDocumentsByUIDs("project", [
    uid,
  ]);

  if (state === "failed") return <NotFound error={error} />;
  else if (state === "loaded")
    return (
      <Layout>
        <FadeInView>
          <Header>
            {document[0].data?.image.url && (
              <TeaserImage
              src={document[0].data.image.url}
              alt={document[0].data.image.alt}
              />
              )}
            {document[0].data.video.html && (
              <Video
              dangerouslySetInnerHTML={{
                __html: document[0].data.video.html,
              }}
              />
              )}
          </Header>
        </FadeInView>
        <FadeInView>
          <Meta>
            <h3>{document[0].data.title}</h3>
            {document[0].tags && (<Tags tags={document[0].tags} />)}
            <br />
            {user?.sub === document[0].data.owner_id && (
              <>
                <Role>Owner</Role>
                {document[0].data.workspace_url && (
                  <a
                    class="button"
                    href={document[0].data.workspace_url.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Workspace
                  </a>
                )}
              </>
            )}
          </Meta>
        </FadeInView>
        <FadeInView>
          <Description>
            <RichText render={document[0].data.content} />
          </Description>
        </FadeInView>
      </Layout>
    );
  return <PageLoader />;
};

export default Project;
