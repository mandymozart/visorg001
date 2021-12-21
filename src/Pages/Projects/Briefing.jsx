import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import ReactMarkdown from "react-markdown";
import Role from "../../Components/Role";
import Tags from "../../Components/Tags";
import useProjectStore from "../../Hooks/ProjectStore";

const Container = styled.section``;
const Header = styled.header``;
const Description = styled(ReactMarkdown)``;

const Briefing = () => {
  const { user } = useAuth0();
  const { project } = useProjectStore();
  if(!project) return "⌛";
  return (
    <Container>
      <Header>
        <h3>{project.title}</h3>
        {project.imageUrl && <img src={project.imageUrl} alt={project.imageUrl} />}
        {user?.sub === project.ownerId && <Role>Owner</Role>} 
        {project.workspaceUrl && <a class="button" href={project.workspaceUrl} target="_blank" rel="noopener noreferrer">Workspace</a>} 
        
        <Tags tags={project.tags} />
        {project.videoUrl && <a class="button" href={project.videoUrl} target="_blank" rel="noopener noreferrer">Play Trailer</a>} 
      </Header>
      <Description source={project.description} />
    </Container>
  );
};

export default Briefing;
