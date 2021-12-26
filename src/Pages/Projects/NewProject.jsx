import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Layout from "../../Components/Layout";

const NewProject = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <Layout>
      <div className="page__header">
        <h3>Start new project</h3>
        <p>Create a brief and add your project pitch.</p>
      </div>
    </Layout>
  );
};

export default NewProject;