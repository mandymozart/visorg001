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

const dateFormat = "YYYY-MM-DD";

// Default to local if not set
const environment = process.env.REACT_APP_STAGE
  ? stages[process.env.REACT_APP_STAGE]
  : stages["LOCAL"];

export const config = {
  // Add common config values here
  dateFormat,
  mailchimpSubscribeUrl: "https://viennastruggle.us14.list-manage.com/subscribe/post?u=1babc648dbf7faf505f6cd64f&amp;id=d0274af64c",
  ethereumWalletAddress: "0x2Bf760e5635A7b10e7Ea43252b70e995924a710e",
  tokenExchangeRate: 2,
  repoURL: "https://gitlab.com/viennastruggle/visngo/-",
  sheetyApiURL:
    "https://api.sheety.co/6f92f2531f272b85130005f9d671fb6e/inventory",
  auth0Domain: "viennastruggle.eu.auth0.com",
  auth0ClientId: "yXFdWoH22B0WZpHjpXwjPTvnY0ihJS7d",
  prismicRepositoryName: "visorg001",
  prismicApiEndpoint: "https://visorg001.cdn.prismic.io/api/v2",
  prismicAccessToken:
    "MC5YeE1YQUJFQUFDRUF4YUtN.77-977-9Vu-_ve-_vVsg77-9Q--_ve-_vUlnMu-_vWVz77-9c--_vSJK77-977-977-977-9ce-_vXg3dyQ",
  ...environment,
};
