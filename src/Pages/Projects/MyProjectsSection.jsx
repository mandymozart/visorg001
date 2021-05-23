import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ProjectList from "../../Components/ProjectList";
import { useGetProjects } from "../../Hooks/Queries";

const MyProjectsSection = () => {
  const { user } = useAuth0();
  const { error, isLoadingProjects, data } = useGetProjects({ ownerId: user.sub });

  if (isLoadingProjects) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if(!data) return null
  return (
    <section>
      <div className="page__header">
        <h3>My Projects</h3>
      </div>
      <ProjectList projects={data.message}/>
    </section>
  );
};

export default MyProjectsSection;