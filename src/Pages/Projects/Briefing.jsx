import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import ReactMarkdown from "react-markdown";
import Role from "../../Components/Role";
import Tags from "../../Components/Tags";
import useProjectStore from "../../Hooks/ProjectStore";

const Container = styled.section`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;
const Header = styled.header`
  text-align: center;
`;
const Meta = styled.div`
  text-align: center;
`;
const TeaserImage = styled.img`
  width: 25rem;
`;
const Description = styled(ReactMarkdown)`
  max-width: var(--content-width-narrow);
  font-size: 1.2rem;
  margin: 0 auto;
`;

const Briefing = () => {
  const { user } = useAuth0();
  const { project } = useProjectStore();
  if (!project) return "⌛";
  return (
    <Container>
      <Header>
        <h3>{project.title}</h3>
        {project.imageUrl && (
          <TeaserImage src={project.imageUrl} alt={project.imageUrl} />
        )}
        {project.videoUrl && (
          <a
            class="button"
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Play Trailer
          </a>
        )}
      </Header>
      <Meta>
        {user?.sub === project.ownerId && <Role>Owner</Role>}
        {project.workspaceUrl && (
          <a
            class="button"
            href={project.workspaceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Workspace
          </a>
        )}

        <Tags tags={project.tags} />
      </Meta>
      <Description source={project.description} />
    </Container>
  );
};

export default Briefing;
