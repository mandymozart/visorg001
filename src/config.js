// Pass the stage key to the build script as follows in your deployment scripts:
// REACT_APP_STAGE=prod yarn build
const stages = {
  LOCAL: {
    FUNCTIONS_API_URL: "https://localhost:8888/.netlify/functions",
  },
  PRD: {
    FUNCTIONS_API_URL: "https://www.viennastruggle.com/.netlify/functions",
  },
};

// Default to local if not set
const environment = process.env.REACT_APP_STAGE
  ? stages[process.env.REACT_APP_STAGE]
  : stages["LOCAL"];

export const config = {
  // Add common config values here
  DATE_FORMAT: "YYYY-MM-DD",
  BANK_WALLET_ABBREVIATION: "vis", // your primary account all fees to there
  BANK_WALLET_ADDRESS: "6b9e0bab-ae49-43a4-8cda-49a9b17f9c61", // same but saver
  MAILCHIMP_SUBSCRIBE_URL:
    "https://viennastruggle.us14.list-manage.com/subscribe/post?u=1babc648dbf7faf505f6cd64f&amp;id=d0274af64c",
  EUR_TO_TOKEN_EXCHANGE_RATE: 2,
  REPO_URL: "https://gitlab.com/viennastruggle/visngo/-",
  INVENTORY_API_ENDPOINT:
    "https://api.sheety.co/6f92f2531f272b85130005f9d671fb6e/inventory",
  COMMUNITY_STORIES_API_ENDPOINT:
    "https://api.sheety.co/6f92f2531f272b85130005f9d671fb6e/communityStories",
  AUTH0_DOMAIN: "viennastruggle.eu.auth0.com",
  AUTH0_CLIENT_ID: "yXFdWoH22B0WZpHjpXwjPTvnY0ihJS7d",
  META_MASK_ACCOUNT_ADDRESS: "0x2Bf760e5635A7b10e7Ea43252b70e995924a710e",
  PRISMIC_REPOSITORY_NAME: "visorg001",
  PRISMIC_API_ENDPOINT: "https://visorg001.cdn.prismic.io/api/v2",
  PRISMIC_ACCESS_TOKEN:
    "MC5YeE1YQUJFQUFDRUF4YUtN.77-977-9Vu-_ve-_vVsg77-9Q--_ve-_vUlnMu-_vWVz77-9c--_vSJK77-977-977-977-9ce-_vXg3dyQ",
  ...environment,
};
