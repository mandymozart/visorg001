import React from "react";
import { ProjectListItem } from "../../Components/ProjectListItem";
import { useGetProjects } from "../../Hooks/Queries";

export default () => {
  const { error, isLoading, data } = useGetProjects({ status: "opencall" });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="Bazar">
      <div className="page__header">
        <h3>Bazar</h3>
        <p>Interested in joining exciting projects? Our daily picks for your profile.</p>
      </div>

      {data.message.map((project) => (
        <ProjectListItem key={project.projectId} project={project} />
      ))}
    </div>
  );
};
