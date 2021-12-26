import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Layout from "../../Components/Layout";

export default () => {
  const {user,isAuthenticated} = useAuth0();
  if(!isAuthenticated) return null;
  return (
    <Layout>
      <h2>
        Welcome, {user.name}
      </h2>
      <p>
        You can manage your struggle participations here. Add tracking, and see your shares.
        We are building as fast as we can and hope to be online soon.
      </p>
    </Layout>
  );
};
