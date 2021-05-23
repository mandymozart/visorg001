import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ProjectList from "../../Components/ProjectList";
import { useGetProjects } from "../../Hooks/Queries";

export default () => {
  const { user } = useAuth0();
  const { error, isLoading, data } = useGetProjects({
    status: "opencall",
    notOwnerId: user?.sub,
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <h3>Open Calls</h3>
      <p>
        We are trying to find projects for you that match your profile and role
        definitions.
      </p>

      <ProjectList projects={data.message} />
    </section>
  );
};
