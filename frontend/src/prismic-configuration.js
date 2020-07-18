import Prismic from 'prismic-javascript'

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
export const apiEndpoint = 'https://visorg001.cdn.prismic.io/api/v2'

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken = 'MC5YeE1YQUJFQUFDRUF4YUtN.77-977-9Vu-_ve-_vVsg77-9Q--_ve-_vUlnMu-_vWVz77-9c--_vSJK77-977-977-977-9ce-_vXg3dyQ'

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'page') return `/page/${doc.uid}`
  return '/'
}

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken })
