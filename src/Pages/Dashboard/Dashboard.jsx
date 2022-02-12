import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import FadeInView from "../../Animations/FadeInView";
import Layout from "../../Components/Layout";

export default () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <Layout>
      <FadeInView>
        <h2>Welcome, {user.name}</h2>
        <p style={{textAlign:"center"}}>Use the menu to rent inventory.</p>
      </FadeInView>
    </Layout>
  );
};
