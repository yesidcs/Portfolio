// Copy this file to "environment.local.ts" is necessary for local development
export const environment = {
  production: false,
  
  //replace these placeholders with Contentful credentials.
  contentful: {
    spaceId: '#CONTENTFUL_SPACE_ID#',
    deliveryToken: '#CONTENTFUL_DELIVERY_TOKEN#'
  }
};