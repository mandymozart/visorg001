import Prismic from "prismic-javascript";
import { config } from "./config";

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
export const apiEndpoint = config.prismicApiEndpoint;

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken = config.prismicAccessToken;

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === "page") return `/page/${doc.uid}`;
  if (doc.type === "tutorial") return `/tutorial/${doc.uid}`;
  if (doc.type === "project") return `/project/${doc.uid}`;
  return "/";
};

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken });
