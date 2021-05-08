import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ProjectListItem } from "../../Components/ProjectListItem";
import { useGetProjects } from "../../Hooks/Queries";

export default () => {
  const { user } = useAuth0();
  const { error, isLoadingProjects, data } = useGetProjects({ status: "opencall", ownerId: user.sub });

  if (isLoadingProjects) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if(!data) return null
  return (
    <div className="Bazar">
      <div className="page__header">
        <h3>My Active Projects</h3>
      </div>

      {data.message.map((project) => (
        <ProjectListItem key={project.projectId} project={project} />
      ))}
    </div>
  );
};
