import React from "react";
import ProjectList from "../../Components/ProjectList";

import { useGetProjects } from "../../Hooks/Queries";

export default () => {
  const { error, isLoading, data } = useGetProjects({
    status: "opencall",
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="Bazar">
      <div className="page__header">
        <h3>Welcome to our Bazar</h3>
        <p>
          We are producing symphonic music and events in a modern way. 
          Interested in joining one of our exciting projects? Learn more and apply!
        </p>
      </div>

      <ProjectList projects={data.message} />
    </div>
  );
};
