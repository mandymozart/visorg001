import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Kanban from "../../Components/Kanban";
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
      <Kanban drafts={data.message.filter(item => item.status === "draft")} opencalls={data.message.filter(item => item.status === "draft")}  done={data.message.filter(item => item.status === "done")}/>
    </section>
  );
};

export default MyProjectsSection;