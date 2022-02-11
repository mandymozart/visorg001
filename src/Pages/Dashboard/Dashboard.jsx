import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import FadeIn from "../../Animations/FadeIn";
import Layout from "../../Components/Layout";

export default () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <Layout>
      <FadeIn>
        <h2>Welcome, {user.name}</h2>
        <p style={{textAlign:"center"}}>Use the menu to rent inventory.</p>
      </FadeIn>
    </Layout>
  );
};
