import styled from "@emotion/styled";
import React from "react";
import Layout from "../../Components/Layout";

const Container = styled.div`
  padding: 1rem;
`;

const MyProjects = () => {
  return (
    <Layout>
      <Container>You have to ask an administrator to join a project.</Container>
    </Layout>
  );
};

export default MyProjects;
