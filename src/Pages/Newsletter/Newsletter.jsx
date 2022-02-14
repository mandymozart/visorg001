import styled from "@emotion/styled";
import React from "react";
import { GiMailbox } from "react-icons/gi";
import Mailchimp from "react-mailchimp-form";
import Layout from "../../Components/Layout";
import { config } from "../../config";
import { BaseSection } from "../LandingPage/BaseSection";

const Container = styled.div`
  max-width: var(--form-width);
  margin: 2rem auto;
  padding: 1rem;
  /* Hole */
  border: 2px solid var(--color);
  box-sizing: border-box;
  /* Up 1 */
  box-shadow: 4px 4px 0px var(--color);
  border-radius: 8px;
  z-index: 1000;
  backdrop-filter: blur(8px);
  input {
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 2rem;
    border: var(--color) 1px solid;
    border-radius: 0.15em;
    padding: 0 0.5rem;
    display: block;
    border-radius: 0.2rem;
    box-sizing: border-box;
    text-decoration: none;
    position: relative;
    transition: all 0.3s cubic-bezier(1, 0, 0, 1);
    outline: none;
    margin-right: 0.5rem;
    width: 100%;
  }
  button {
    line-height: 2rem;
    width: 100%;
    font-size: 1rem;
    justify-self: center;
    text-align: center;
    padding: 0 1rem;
    cursor: pointer;
    border: 0;
    display: inline-block;
    border-radius: 0.15em;
    box-sizing: border-box;
    text-decoration: none;
    text-align: center;
    position: relative;
    transition: all 0.2s cubic-bezier(1, 0, 0, 1);

    background-color: var(--fifth);
    box-shadow: none;
    color: var(--background);
    font-weight: bold;
    &:hover {
      background-color: var(--fifth);
      color: var(--background);
      box-shadow: inset 0 -0.6em 0 -0.35em #00000054;
    }
    &:hover {
      transform: translateY(-0.05rem);
      background-color: var(--fifth);
      color: var(--background);
      box-shadow: inset 0 -0.6em 0 -0.35em #00000054;
    }
  }
  &&& h2 {
    margin: 0;
    text-align: left;
  }
  p {
    margin-bottom: 1rem;
  }
`;

// use the render prop and your custom form
export const NewsletterForm = () => (
  <Container>
    <h2>
      <GiMailbox /> Newsletter
    </h2>
    <p>
      Receive upcoming open calls, releases and events straight into your inbox.
      Cancel anytime.
    </p>
    <Mailchimp
      action={config.MAILCHIMP_SUBSCRIBE_URL}
      fields={[
        {
          name: "EMAIL",
          placeholder: "Email",
          type: "email",
          required: true,
        },
      ]}
    />
  </Container>
);

function NewsletterPage() {
  return (
    <Layout>
      <BaseSection>
        <NewsletterForm />
      </BaseSection>
    </Layout>
  );
}

export default NewsletterPage;
