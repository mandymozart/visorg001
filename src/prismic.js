import * as prismic from '@prismicio/client'
import { config } from './config'

// Fill in your repository name

const endpoint = prismic.getEndpoint(config.PRISMIC_REPOSITORY_NAME)

export const client = prismic.createClient(endpoint, {
  // If your repo is private, add an access token
  accessToken: config.PRISMIC_ACCESS_TOKEN,

  // This defines how you will structure URL paths in your project.
  // Update the types to match the Custom Types in your project, and edit
  // the paths to match the routing in your project.
  //
  // If you are not using a router in your project, you can change this
  // to an empty array or remove the option entirely.
  routes: [
    {
      type: 'page',
      path: '/:uid',
    },
    {
      type: 'project',
      path: '/:uid',
    },
    {
      type: 'tutorial',
      path: '/:uid',
    },
    {
      type: 'user',
      path: '/:uid',
    },
    {
      type: 'contribution',
      path: '/:uid',
    },
    {
      type: 'epic',
      path: '/:uid',
    },
    {
      type: 'issue',
      path: '/:uid',
    },
  ],
})