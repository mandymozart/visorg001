import styled from "@emotion/styled";
import React from "react";
import { GiMailbox } from "react-icons/gi";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Layout from "../../Components/Layout";
import { config } from "../../config";
import { BaseSection } from "../LandingPage/BaseSection";

const Container = styled.div`
  max-width: var(--form-width);
  margin: 2rem auto;
  padding: 4rem 4rem;
  background: rgba(255, 255, 255, 0.7);
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
  }
  button {
    width: 100%;
    line-height: 2rem;
    font-size: 1rem;
    justify-self: center;
    font-weight: 100;
    padding: 0 1rem;
    cursor: pointer;
    border: 0;
    display: inline-block;
    border-radius: 0.15em;
    box-sizing: border-box;
    text-decoration: none;
    background-color: var(--text);
    color: #ffffff;
    text-align: center;
    position: relative;
    transition: all 0.2s cubic-bezier(1, 0, 0, 1);
    outline: none;
    &:hover {
      transform: translateY(-0.1rem);
      box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.23);
    }
  }
  &&& h2 {
    margin: 0;
    text-align: left;
  }
`;

// use the render prop and your custom form
export const NewsletterForm = () => (
  <Container>
    <h2><GiMailbox/> {" "}Newsletter</h2>
    <p>
      Receive upcoming open calls, releases and events straight into your inbox.
      Cancel anytime.
    </p>
    <MailchimpSubscribe
      url={config.mailchimpSubscribeUrl}
      render={({ subscribe, status, message }) => (
        <div className="field">
          <MailchimpSubscribe onSubmitted={(formData) => subscribe(formData)} />
          {status === "sending" && (
            <div style={{ color: "blue" }}>sending...</div>
          )}
          {status === "error" && (
            <div
              style={{ color: "red" }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {status === "success" && (
            <div style={{ color: "green" }}>Subscribed !</div>
          )}
        </div>
      )}
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