import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import React from "react";
import ProjectList from "../../Components/ProjectList";
import { useGetProjects } from "../../Hooks/Queries";

const Container = styled.div``

export default () => {
  const { user } = useAuth0();
  const { error, isLoadingProjects, data } = useGetProjects({ ownerId: user.sub });

  if (isLoadingProjects) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if(!data) return null
  return (
    <Container>
      <div className="page__header">
        <h3>My Projects</h3>
      </div>
      <ProjectList projects={data.message}/>
    </Container>
  );
};
