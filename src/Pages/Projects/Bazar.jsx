import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ProjectList from "../../Components/ProjectList";

import { useGetProjects } from "../../Hooks/Queries";

export default () => {
  const { user } = useAuth0();
  const { error, isLoading, data } = useGetProjects({
    status: "opencall",
    notOwnerId: user.sub,
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="Bazar">
      <div className="page__header">
        <h3>Bazar</h3>
        <p>
          Interested in joining exciting projects? Our daily picks for your
          profile.
        </p>
      </div>

      <ProjectList projects={data.message} />
    </div>
  );
};
