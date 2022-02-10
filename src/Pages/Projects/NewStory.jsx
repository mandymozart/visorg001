import styled from "@emotion/styled";
import React from "react";
import { RiQuillPenFill } from "react-icons/ri";
import { PrimaryButton } from "../../Components/FormElements/Button";
import Layout from "../../Components/Layout";
const Container = styled.div`
  padding: 1rem;
  textarea {
    border: none;
    background: white;
    font-size: 2rem;
  }
`;
const NewStory = () => {
  return (
    <Layout>
      <Container>
        <h3>
          <RiQuillPenFill /> Share your story with us
        </h3>
        <p>
          Every song starts with a story, a brokenheart, a lost moment, a fucked
          up madman, an anfortunate culmination of events.
        </p>
        <p>Write from the heart:</p>
        <textarea placeholder="It was one lousy night on the high street in Casablanca that August, oh yes, that August. ..."></textarea>
        <PrimaryButton>Submit</PrimaryButton>
      </Container>
    </Layout>
  );
};

export default NewStory;
