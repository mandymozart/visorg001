import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import ReactMarkdown from "react-markdown";
import Role from "../../Components/Role";
import Tags from "../../Components/Tags";
import { useGetProject } from "../../Hooks/Queries";
import NotFound from "../NotFound";

const Container = styled.div``;

export default ({ match }) => {
  const { user } = useAuth0();
  const projectId = match.params.projectId;
  const { error, isLoadingProjects, data } = useGetProject(projectId);

  if (isLoadingProjects) return "Loading...";

  if (error) return <NotFound />;
  if (!data) return null;
  return (
    <Container>
      <div className="page__header">
        <h3>{data.message.title}</h3>
        {user.sub === data.message.ownerId && <Role>Owner</Role>}
        <Tags tags={data.message.tags} />
      </div>

      <ReactMarkdown
        source={data.message.description}
        className="description"
      />
    </Container>
  );
};
