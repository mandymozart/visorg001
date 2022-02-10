import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Layout from "../../Components/Layout";
import { config } from "../../config";
import { BaseSection } from "../LandingPage/LandingPage";


// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={config.mailchimpSubscribeUrl}/>

// use the render prop and your custom form
export const NewsletterForm = () => (
  <MailchimpSubscribe
    url={config.mailchimpSubscribeUrl}
    render={({ subscribe, status, message }) => (
      <div>
        <SimpleForm onSubmitted={formData => subscribe(formData)} />
        {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
        {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
        {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
      </div>
    )}
  />
)

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
